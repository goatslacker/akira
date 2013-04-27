var MemberExpression = require('ast/MemberExpression');
var ast = require('ast');
var unwrapExpressionStatement = require('unwrapExpressionStatement')

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

  var id = unwrapExpressionStatement(ast(this.id, context))

  return MemberExpression(id, prop, computed);
};

module.exports = Access;
