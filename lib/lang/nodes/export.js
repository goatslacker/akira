var ast = require('ast');

function Export(i) {
  this.i = i;
  return this;
}

Export.prototype.compile = function (context) {
  if (context.$$$exported) {
    throw new Error('Cannot export more than one Value at ' + context.$$$filename + ':' + this.line);
  }
  context.$$$exported = this.i;
  var iden;
  var type = this.i.constructor.name;

  switch (type) {
  case 'Declaration':
    iden = this.i.name;
    break;
  case 'Assignment':
    iden = this.i.id;
    break;
  default:
    iden = this.i;
  }

  var x = ast(this.i, context);

  if (type === 'Assignment') {
    x = x[0].expression;
  }

  return {
    type: 'ReturnStatement',
    argument: x
  };
};

module.exports = Export;
