var ast = require('ast');

function Access(id, prop) {
  this.id = id;
  this.prop = prop;
  return this;
}

Access.prototype.compile = function (context) {
  var prop = ast(this.prop, context);
  var computed = false;

  if (prop.type === 'Literal' && typeof prop.value === 'number') {
    computed = true;
    prop.value = prop.value - 1; // 1-index
  }
  if (prop.type === 'Literal' && typeof prop.value === 'string') {
    computed = true;
  }

  var id = ast(this.id, context);
  if (Array.isArray(id)) {
    id = id.pop();
  }
  id = id.type === 'ExpressionStatement' ? id.expression : id;

  return {
    type: 'MemberExpression',
    computed: computed,
    object: id,
    property: prop
  };
};

module.exports = Access;
