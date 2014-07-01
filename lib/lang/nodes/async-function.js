var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var FunctionExpression = require('ast/FunctionExpression')
var Identifier = require('ast/Identifier')
var MemberExpression = require('ast/MemberExpression')
var ast = require('ast')
var createFunction = require('createFunction')
var getScope = require('getScope')
var traverse = require('traverse')

var PromiseNode = (function () {
  var node = Identifier('Promise')
  node.__core = true
  return node
}())

function rewriteAwaitIntoPromiseHell(body) {
  var nextBody = null
  var nextNode = null

  var xBody = body.reduce(function (exprs, expr) {
    var pendingBody = null

    if (expr.type !== 'ReturnStatement' && expr.type !== 'ExpressionStatement') {
      return exprs.concat(expr)
    }

    // traverse through each tree to find the awaitables and beta redexes
    var thenode = traverse(expr, function (node, parent, type, scope) {

      if (node.type === 'BlockStatement') {
        if (node.body.length > 0) {
          return {
            type: 'BlockStatement',
            body: rewriteAwaitIntoPromiseHell(node.body)
          }
        }
        return node
      }

      if (node.type === 'ConditionalExpression') {
        if (node.consequent.__await || node.alternate.__await) {
          var args = parent.type === 'AssignmentExpression'
            ? [parent.left]
            : []

          pendingBody = FunctionExpression(null, args, [])

          var betaRedexPromise = makePromise([ExpressionStatement(return2resolve(node))])

          nextNode = CallExpression(
            MemberExpression(betaRedexPromise, Identifier('then')),
            [pendingBody]
          )
          nextNode.__await = true
          return nextNode
        }
      }

      // if its a beta redex we need to promisify it
      if (node.__betaRedex) {
        var betaRedexPromise = makePromise(
          node.callee.object.body.body
        )

        var args = parent.type === 'AssignmentExpression'
          ? [parent.left]
          : []

        pendingBody = FunctionExpression(null, args, [])

        nextNode = CallExpression(
          MemberExpression(betaRedexPromise, Identifier('then')),
          [pendingBody]
        )
        nextNode.__await = true
        return nextNode
      }

      // if its an awaitable we need to pull the assignment and nest the
      // next statements after it to turn sync code into async
      if (node.__await) {
        if (parent.type === 'ConditionalExpression') {
          return node
        }
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
      nextNode.arguments = [Identifier('resolve'), Identifier('reject')]
    }
  }

  return xBody
}

function AsyncFunction(args, body) {
  this.args = args
  this.body = body
}

AsyncFunction.prototype.compile = function (context) {
  var scope = getScope(context, [])
  var args = this.args ? ast(this.args, scope) : []
  var body = ast(this.body, scope)

  implicitResolve(body)

  // XXX take two passes on xBody
  // first one rewrites into promise hell
  // the second pass looks for all assignments and rewrites them
  // if they are trying to assign the result of a promise...
  var xBody = rewriteAwaitIntoPromiseHell(body)

  // wrap the whole thing in a promise
  var promise = {
    type: 'NewExpression',
    callee: PromiseNode,
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
    callee: PromiseNode,
    arguments: [FunctionExpression(
      null,
      [Identifier('resolve'), Identifier('reject')],
      body
    )]
  }
  return promise
}

function resolver(node) {
  if (node.__await) {
    return CallExpression(
      node.callee,
      [Identifier('resolve'), Identifier('reject')]
    )
  }

  return CallExpression(
    Identifier('resolve'),
    [node]
  )
}

function return2resolve(node) {
//  if (node.__await) {
//    return ExpressionStatement(
//      CallExpression(
//        MemberExpression(node.callee.object, node.callee.property),
//        [Identifier('resolve'), Identifier('reject')]
//      )
//    )
//    return ExpressionStatement(node)
//  }

  if (node.type === 'ConditionalExpression') {
    if (node.consequent.__await || node.alternate.__await) {
      return ExpressionStatement({
        type: 'ConditionalExpression',
        test: node.test,
        consequent: resolver(node.consequent),
        alternate: resolver(node.alternate)
      })
    }
  }

  return ExpressionStatement(CallExpression(
    Identifier('resolve'),
    [node]
  ))
}

function implicitResolve(body, f) {
  var ret = body[body.length - 1];
  ret = ret.type === 'ExpressionStatement' ? ret.expression : ret;

  if (ret.__await) {
    return
  }

  if (ret.type === 'ReturnStatement') {
    if (ret.argument.__await) {
      return
    }
    body[body.length - 1] = ExpressionStatement(CallExpression(
      Identifier('resolve'),
      [f ? f(ret.argument) : ret.argument]
    ))
  }

  if (ret.__betaRedex) {
    implicitResolve(ret.callee.object.body.body, f);
    return
  }

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

module.exports = AsyncFunction
