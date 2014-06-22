var ast = require('ast')

function Instantiate(iden) {
  this.iden = iden
}

Instantiate.prototype.compile = function (context) {
  var name = ast(this.iden, context)

  return {
    type: 'NewExpression',
    callee: name.callee,
    arguments: name.arguments
  }
}

module.exports = Instantiate
