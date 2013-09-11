var ast = require('ast')

function Class(id) {
  this.id = id
}

Class.prototype.compile = function (context) {
  var def = ast(this.id, context)
  return []
}

module.exports = Class
