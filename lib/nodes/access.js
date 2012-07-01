var Base = require('./base');

function Access(id, prop) {
  this.id = id;
  this.prop = prop;
  return this;
}

Access.prototype.compile = function (context) {
  var prop = Base.compileValue(this.prop, context);
  var computed = false;

  if (prop.type === 'Literal' && typeof prop.value === 'number') {
    computed = true;
    prop.value = prop.value - 1; // 1-index
  }
  if (prop.type === 'Literal' && typeof prop.value === 'string') {
    computed = true;
  }

  return {
    type: 'MemberExpression',
    computed: computed,
    object: Base.compileValue(this.id, context),
    property: prop
  };
};

module.exports = Access;
