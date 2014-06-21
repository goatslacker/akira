var ast = require('ast')

function TypeAlias(id) {
  this.id = id
}

TypeAlias.prototype.compile = function (context) {
  var def = ast(this.id, context)
  return []
}

module.exports = TypeAlias
