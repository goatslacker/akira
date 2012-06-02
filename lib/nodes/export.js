var Base = require('./base');

var Export = function (i) {
  this.i = i;
  return this;
};

Export.prototype.compile = function (context) {
  var iden;
  if (this.i.body) {
    iden = this.i.name;
  } else if (this.i.id) {
    iden = this.i.id;
  } else {
    iden = this.i;
  }
  var x = Base.compileValue(this.i, context);

  if (this.i.body) {
    x = x.expression;
  } else if (this.i.id) {
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
