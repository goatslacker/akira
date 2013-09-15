var BinaryExpression = require('ast/BinaryExpression')
var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var FunctionExpression = require('ast/FunctionExpression')
var Identifier = require('ast/Identifier')
var IfStatement = require('ast/IfStatement')
var Literal = require('ast/Literal')
var ast = require('ast')
var fu = require('fu')
var betaRedex = require('betaRedex')
var implicitReturn = require('implicitReturn')

var ex = Identifier('_$ex')

function doReturn(x, shouldAddCallback) {
  return [{
    type: 'ReturnStatement',
    argument: shouldAddCallback
      ? CallExpression(Identifier('_$callback'), [x])
      : x
  }]
}

function tryandcatch(t) {
  return {
    type: 'TryStatement',
    block: {
      type: 'BlockStatement',
      body: [t]
    },
    handlers: [{
      type: 'CatchClause',
      param: Identifier('ex'),
      guard: null,
      body: {
        type: 'BlockStatement',
        body: [ExpressionStatement(Literal(null))]
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

function addDatCallbackYo(args, call, body, shouldAddCallback) {
  implicitReturn(body, function (node) {
    return shouldAddCallback
      ? CallExpression(Identifier('_$callback'), [node])
      : node
  })

  var hasPlaceholder = fu.any(function (x) {
    return x.name == '_'
  }, call.arguments)

  var hasCatch = fu.any(function (x) {
    return x.name == 'catch'
  }, args.elements)

  // replace the _ with the function body
  // also replace catches with an error check
  function replace(x) {
    return x.name == '_'
      ? FunctionExpression(null, fu.map(replaceCatch, args.elements),
          fu.concat(hasCatch ? catchGuard(shouldAddCallback) : [], body))
      : x
  }

  return [ExpressionStatement(CallExpression(
    call.callee,
    hasPlaceholder
      ? fu.map(replace, call.arguments)
      : fu.concat(call.arguments, [replace({ name: '_' })])
  ))]
}

function Do(body) {
  this.body = body.args.slice(0)
  this.callback = false
}

Do.prototype.compile = function (context) {
  var self = this

  var last = fu.last(this.body)
  if (!last.expr) {
    throw new TypeError('Last statement must be an expression')
  }

  var doexpr = fu.foldl(function (body, node) {
    if (node.expr) {
      var expr = ast(node.expr, context)

      // Combine TryStatement Expressions
      if (body.length && fu.head(body).type == 'TryStatement') {
        var item = fu.head(body)
        item.block.body.unshift(ExpressionStatement(expr))
        return body
      }

      return fu.concat([tryandcatch(ExpressionStatement(expr))], body)
    } else {
      var args = ast(node.args, context)
      var call = ast(node.call, context)

      return addDatCallbackYo(
        args,
        call = call.type == 'CallExpression' ? call : CallExpression(call, []),
        body,
        self.callback
      )
    }
  }, this.body.reverse(), [])

  implicitReturn(doexpr)

  return betaRedex(doexpr)
}

module.exports = Do
