var Base = require('./base');

function Export(i) {
  this.i = i;
  return this;
}

Export.prototype.compile = function (context) {
  if (context.$$$exported) {
    throw new Error('Cannot export more than one Value');
  }
  context.$$$exported = this.i;
  var iden;
  var type;

  switch (type = this.i.constructor.name) {
    case 'Declaration':
      iden = this.i.name;
      break;
    case 'Assignment':
      iden = this.i.id;
      break;
    default:
      iden = this.i;
  }

  var x = Base.compileValue(this.i, context);

  if (type === 'Declaration') {
    x = x.expression;
  } else if (type === 'Assignment') {
    x = x[0].expression;
  }

//  context[iden.name].__exports = true;

  return { 
    type: 'ReturnStatement',
    argument: x
  };

/*
    {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'Identifier',
        name: '$$export'
      },
      right: x
    }
    */
};

module.exports = Export;
