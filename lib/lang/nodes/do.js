var BinaryExpression = require('ast/BinaryExpression')
var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var FunctionExpression = require('ast/FunctionExpression')
var Identifier = require('ast/Identifier')
var IfStatement = require('ast/IfStatement')
var Literal = require('ast/Literal')
var ast = require('ast')
var fu = require('fu')
var makeArray = require('makeArray')

var ex = Identifier('_$ex')

function foldl(f, coll, acc) {
  return acc.concat(coll).reduce(f)
}

function makeExpression(expr, a, context) {
  var compiledExpr = ast(expr, context)
  return makeArray(ExpressionStatement(compiledExpr))
    .concat(ExpressionStatement(a))
}

function doReturn(x, shouldAddCallback) {
  return [{
    type: 'ReturnStatement',
    argument: shouldAddCallback
      ? CallExpression(Identifier('_$callback'), [x])
      : x
  }]
}

function tryandcatch(t, c) {
  return {
    type: 'TryStatement',
    block: {
      type: 'BlockStatement',
      body: t
    },
    handlers: [{
      type: 'CatchClause',
      param: Identifier('ex'),
      guard: null,
      body: {
        type: 'BlockStatement',
        body: c
      }
    }],
    finalizer: null
  }
}

function catchGuard(shouldAddCallback) {
  return [IfStatement(
    BinaryExpression('!=', ex, Literal(null)),
    doReturn(ex, shouldAddCallback),
    null
  )]
}

function replaceCatch(x) {
  return x.name == 'catch' ? ex : x
}

function addNextToCall(shouldAddCallback, call, boundName, next) {
  var hasPlaceholder = fu.any(function (x) {
    return x.name == '_'
  }, call.arguments)

  var hasCatch = fu.any(function (x) {
    return x.name == 'catch'
  }, boundName.elements)

  function replace(x) {
    return x.name == '_'
      ? FunctionExpression(null, fu.map(replaceCatch, boundName.elements),
          fu.concat(hasCatch ? catchGuard(shouldAddCallback) : [],
            makeArray(ExpressionStatement(next))))
      : x
  }

  return call.type === 'CallExpression'
    ? CallExpression(call.callee, hasPlaceholder
        ? fu.map(replace, call.arguments)
        : fu.concat(call.arguments, [replace({ name: '_' })])
      )
    : call
}

function Do(body) {
  this.body = body.args.slice(0)
  this.callback = false
}

Do.prototype.compile = function (context) {
  var self = this
  return foldl(function (a, b) {
    if (a === null) {
      if (!b.expr) {
        throw new TypeError('Last statement must be an expression')
      }
      return tryandcatch(
        doReturn(ast(b.expr, context), self.callback),
        doReturn(Literal(null), self.callback)
      )
    } else {
      if (b.expr) {
        return tryandcatch(
          makeExpression(b.expr, a, context),
          [ExpressionStatement(Literal(null))]
        )
      }

      var args = ast(b.args, context)
      var call = ast(b.call, context)

      return addNextToCall(
        self.callback,
        call.type == 'Identifier' ? CallExpression(call, []) : call,
        args,
        a
      )
    }
  }, this.body.reverse(), [null])
}

module.exports = Do
