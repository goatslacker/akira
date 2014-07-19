var ast = require('ast');

function Export(i) {
  this.i = i;
  return this;
}

Export.prototype.compile = function (context) {
  if (context.$$$exported) {
    throw new Error('Cannot export more than one Value at ' + context.$$$filename + ':' + this.line);
  }
  var x = ast(this.i, context);
  context.$$$exported = x
  return []
};

module.exports = Export;
