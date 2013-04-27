var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var FunctionExpression = require('ast/FunctionExpression')
var Identifier = require('ast/Identifier')
var MemberExpression = require('ast/MemberExpression')
var ast = require('ast')
var createFunction = require('createFunction')

function makeArguments(args) {
  return [args]
}

function foldl(f, coll, acc) {
  return acc.concat(coll).reduce(f)
}

function makeExpression(expr, a, context) {
  var compiledExpr = ast(expr, context)
  return ExpressionStatement(compiledExpr).concat(ExpressionStatement(a))
}

function transformer(context) {
  return function (a, b) {
    if (a === null) {
      if (!b.expr) {
        throw new TypeError('Last statement must be an expression')
      }
      return CallExpression(
        Identifier('_$callback'),
        makeArguments(ast(b.expr, context))
      )
    } else {
      if (b.expr) {
        return makeExpression(b.expr, a, context)
      }

      var args = ast(b.args, context)
      var call = ast(b.call, context)

      if (b.isReturn) {
        return CallExpression(
          createFunction(args.elements, a, context),
          makeArguments(call)
        )
      }

      return addNextToCall(call, args, a)
    }
  }
}

function addNextToCall(call, boundName, next) {
  return call.type === 'CallExpression'
    ? CallExpression(call.callee, call.arguments.concat(
        FunctionExpression(null, boundName.elements, ExpressionStatement(next))
      ))
    : call
}

function Async(body, args) {
  this.body = body.args.slice(0)
  this.args = args;
}

Async.prototype.compile = function (context) {
  var scope = {
    $$$filename: context.$$$filename,
    $$$params: this.params
  };

  var body = foldl(transformer(scope), this.body.reverse(), [null])

  var args = this.args ? ast(this.args, scope) : []
  args.push(Identifier('_$callback'))

  return createFunction(args, ExpressionStatement(body), scope)
}

module.exports = Async
