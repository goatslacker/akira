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

function transformer(context, self) {
  return function (a, b) {
    if (a === null) {
      if (!b.expr) {
        throw new TypeError('Last statement must be an expression')
      }
      var i = ast(b.expr, context)
      return {
        type: 'ReturnStatement',
        argument: self.callback
          ? CallExpression(Identifier('_$callback'), [i])
          : i
      }
    } else {
      if (b.expr) {
        return makeExpression(b.expr, a, context)
      }

      var args = ast(b.args, context)
      var call = ast(b.call, context)

      if (call.type == 'Identifier') {
        call = CallExpression(call, [])
      }

      return addNextToCall(call, args, a)
    }
  }
}

function catchGuard() {
  return [IfStatement(
    BinaryExpression('!=', ex, Literal(null)),
    { type: 'ReturnStatement', argument: ex }, null
  )]
}

function replaceCatch(x) {
  return x.name == 'catch' ? ex : x
}

function addNextToCall(call, boundName, next) {
  var hasPlaceholder = fu.any(function (x) {
    return x.name == '_'
  }, call.arguments)

  var hasCatch = fu.any(function (x) {
    return x.name == 'catch'
  }, boundName.elements)

  function replace(x) {
    return x.name == '_'
      ? FunctionExpression(null, fu.map(replaceCatch, boundName.elements),
          fu.concat(hasCatch ? catchGuard() : [],
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
  var scope = {
    $$$filename: context.$$$filename,
    $$$params: this.params
  };

  return foldl(transformer(scope, this), this.body.reverse(), [null])
}

module.exports = Do
