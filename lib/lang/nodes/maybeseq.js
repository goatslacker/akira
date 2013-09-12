var ExpressionStatement = require('ast/ExpressionStatement')
var Identifier = require('ast/Identifier')
var Literal = require('ast/Literal')
var ast = require('ast')

function MaybeSeq(body) {
  this.body = body
}

MaybeSeq.prototype.compile = function (context) {
  return {
    type: 'TryStatement',
    block: {
      type: 'BlockStatement',
      body: ast(this.body, context)
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
