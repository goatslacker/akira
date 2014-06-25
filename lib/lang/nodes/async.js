var BinaryExpression = require('ast/BinaryExpression')
var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var FunctionExpression = require('ast/FunctionExpression')
var Identifier = require('ast/Identifier')
var IfStatement = require('ast/IfStatement')
var Literal = require('ast/Literal')
var MemberExpression = require('ast/MemberExpression')
var ast = require('ast')
var createFunction = require('createFunction')
var fu = require('fu')
var genUniqueIdentifier = require('genUniqueIdentifier')
var getScope = require('getScope')
var makeArray = require('makeArray')
var traverse = require('traverse')

function Async(args, body) {
  this.args = args
  this.body = body
}

Async.prototype.compile = function (context) {
  var scope = getScope(context, [])
  var args = this.args ? ast(this.args, scope) : []
  var body = ast(this.body, scope)

  // XXX this code is confusing and needs comments
  var nextBody = null
  var nextNode = null

  // iterate through it like a flat structure so we can nest promises
  var xBody = body.reduce(function (exprs, expr) {
    var pendingBody = null

    // traverse through each tree to find the awaitables and beta redexes
    var thenode = traverse(expr, function (node, parent, type, scope) {

      // if its a beta redex we need to promisify it
      if (node.__betaRedex) {
        var betaRedexPromise = makePromise(
          return2resolve(node.callee.object.body.body)
        )

        var args = parent.type === 'AssignmentExpression'
          ? [parent.left]
          : []

        pendingBody = FunctionExpression(null, args, [])

        nextNode = CallExpression(
          MemberExpression(betaRedexPromise, Identifier('then')),
          [pendingBody]
        )
        return nextNode
      }

      // if its an awaitable we need to pull the assignment and nest the
      // next statements after it to turn sync code into async
      if (node.__await) {
        var args = parent.type === 'AssignmentExpression'
          ? [parent.left]
          : []

        pendingBody = FunctionExpression(null, args, [])
        nextNode = CallExpression(
          node.callee,
          [pendingBody, Identifier('reject')]
        )
        nextNode.__await = true
        return nextNode
      }
      return node
    })


    // this shit does all the body appending magic
    if (pendingBody == null && nextBody) {
      nextBody.body.body.push(thenode)
      return exprs
    } else if (pendingBody) {
      if (nextBody) {
        nextBody.body.body.push(thenode)
        nextBody = pendingBody
        return exprs
      } else {
        nextBody = pendingBody
      }
    }

    return exprs.concat(thenode)
  }, [])

  // add resolves to the last statements
  if (nextBody) {

    // unless the last statement is empty, then pass in resolve
    if (nextBody.body.body.length === 0) {
      nextNode.arguments = [Identifier('resolve')]
    } else {
      implicitResolve(nextBody.body.body)
    }
  } else {
    implicitResolve(xBody)
  }

  // wrap the whole thing in a promise
  var promise = {
    type: 'NewExpression',
    callee: Identifier('Promise'),
    arguments: [FunctionExpression(
      null,
      [Identifier('resolve'), Identifier('reject')],
      xBody
    )]
  }

  // it's a function yay!
  return createFunction(args, promise, scope)
}

function makePromise(body) {
  var promise = {
    type: 'NewExpression',
    callee: Identifier('Promise'),
    arguments: [FunctionExpression(
      null,
      [Identifier('resolve'), Identifier('reject')],
      body
    )]
  }
  return promise
}

function return2resolve(body) {
  return traverse(body, function (node) {
    if (node.type === 'ReturnStatement') {

      if (node.argument.__await) {
        return ExpressionStatement(
          CallExpression(
            MemberExpression(node.argument.callee.object, node.argument.callee.property),
            [Identifier('resolve')]
          )
        )
        return ExpressionStatement(node.argument)
      }

      return ExpressionStatement(CallExpression(
        Identifier('resolve'),
        [node.argument]
      ))
    }
    return node
  })
}

// XXX refactor implcitReturn
function implicitResolve(body, f) {
  var ret = body[body.length - 1];
  ret = ret.type === 'ExpressionStatement' ? ret.expression : ret;

  switch (ret.type) {
  case 'ThrowStatement':
  case 'ForInStatement':
  case 'ReturnStatement':
    return;
  }

  if (Array.isArray(ret)) {
    implicitResolve(ret, f)
  } else if (ret.type === 'TryStatement') {
    implicitResolve(ret.block.body, f);
    implicitResolve(ret.handlers[0].body.body, f);
    return;
  } else if (ret.type === 'SwitchStatement') {
    if (ret.__cond === true) {
      ret.cases.forEach(function (x) {
        implicitResolve(x.consequent, f);
      });
    } else {
      return;
    }
  } else if (ret.type === 'IfStatement') {
    implicitResolve(ret.consequent.body, f);
    ret.alternate && implicitResolve(ret.alternate.body, f);
  } else {
    body[body.length - 1] = ExpressionStatement(CallExpression(
      Identifier('resolve'),
      [f ? f(ret) : ret]
    ))
  }
}

module.exports = Async
