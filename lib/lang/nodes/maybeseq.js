var BinaryExpression = require('ast/BinaryExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var Identifier = require('ast/Identifier')
var IfStatement = require('ast/IfStatement')
var Literal = require('ast/Literal')
var ast = require('ast')
var betaRedex = require('betaRedex')
var fu = require('fu')
var implicitReturn = require('implicitReturn')

function MaybeSeq(body, params) {
  this.body = body
  this.params = params
}

MaybeSeq.prototype.compile = function (context) {
  var body = ast(this.body, context)

  if (this.params) {
    var params = ast(this.params, context)
    var ifs = fu.foldl(function (a, x) {
      return a.concat(IfStatement(
        BinaryExpression('==', x, Literal(null)),
        { type: 'ReturnStatement', argument: Literal(null) },
        null
      ))
    }, params, [])

    implicitReturn(body)

    return betaRedex(fu.concat(ifs, body))
  }
  return {
    type: 'TryStatement',
    block: {
      type: 'BlockStatement',
      body: body
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

  return body
}

module.exports = MaybeSeq
