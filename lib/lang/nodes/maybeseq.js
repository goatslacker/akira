var BinaryExpression = require('ast/BinaryExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var Identifier = require('ast/Identifier')
var IfStatement = require('ast/IfStatement')
var Literal = require('ast/Literal')
var ast = require('ast')
var betaRedex = require('betaRedex')
var fu = require('fu')
var implicitReturn = require('implicitReturn')

function MaybeSeq(value) {
  this.value = value
}

MaybeSeq.prototype.compile = function (context) {
  var value = ast(this.value, context)
  var body = [IfStatement(
    BinaryExpression('==', value, Literal(null)),
    Literal(null),
    value
  )]
  implicitReturn(body)

  return betaRedex(body)
}

module.exports = MaybeSeq
