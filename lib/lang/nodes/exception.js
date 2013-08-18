var Identifier = require('ast/Identifier')
var ast = require('ast')

function Exception(tr, ca, t) {
  this.tr = tr
  this.ca = ca
  this.t = t

  return this
}

Exception.prototype.compile = function (context) {
  return {
    type: 'ThrowStatement',
    argument: {
      type: 'NewExpression',
      callee: this.t ? ast(this.t, context) : Identifier('Error'),
      arguments: [ast(this.ca, context)]
    }
  }
}

module.exports = Exception
