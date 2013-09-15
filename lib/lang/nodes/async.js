var BinaryExpression = require('ast/BinaryExpression')
var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var Identifier = require('ast/Identifier')
var IfStatement = require('ast/IfStatement')
var FunctionExpression = require('ast/FunctionExpression')
var Literal = require('ast/Literal')
var MemberExpression = require('ast/MemberExpression')
var ast = require('ast')
var fu = require('fu')
var genUniqueIdentifier = require('genUniqueIdentifier')
var makeArray = require('makeArray')
var implicitReturn = require('implicitReturn')

var callback = Identifier('_$callback')

function Async(body, args) {
  this.body = body
  this.args = args;
}

Async.prototype.compile = function (context) {
  this.body.callback = true

  var body = ast(this.body, context)
  var args = this.args ? ast(this.args, context) : []

  var fnName = Identifier(genUniqueIdentifier(genUniqueIdentifier(String(Math.random()))))

  var curried = IfStatement(
    BinaryExpression('==', callback, Literal(null)),
    { type: 'ReturnStatement',
      argument: CallExpression(
        MemberExpression(fnName, Identifier('bind'), false),
        fu.concat([fnName], args)
      ) },
    null
  )

  var body = fu.concat([curried], makeArray(ExpressionStatement(body)))
  implicitReturn(body)

  return FunctionExpression(
    fnName,
    fu.concat(args, [callback]),
    body
  )
}

module.exports = Async
