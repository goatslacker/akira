var Base = require('./base');

function Export(i) {
  this.i = i;
  return this;
}

Export.prototype.compile = function (context) {
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

  return {
    type: 'AssignmentExpression',
    operator: '=',
    left: {
      type: 'MemberExpression',
      computed: false,
      object: { type: 'ThisExpression' },
      property: Base.compileValue(iden, context)
    },
    right: x
  };
};

module.exports = Export;
