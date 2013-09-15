var ast = require('ast');
var AssignmentExpression = require('ast/AssignmentExpression')
var MemberExpression = require('ast/MemberExpression')
var Identifier = require('ast/Identifier')

function Export(i, isNode) {
  this.i = i;
  this.isNode = isNode
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

  if (this.isNode) {
    x = AssignmentExpression(
      MemberExpression(Identifier('module'), Identifier('exports'), false),
      x
    )
  }

  return {
    type: 'ReturnStatement',
    argument: x
  };
};

module.exports = Export;
