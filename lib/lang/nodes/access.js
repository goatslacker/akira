var MemberExpression = require('ast/MemberExpression');
var ast = require('ast');
var unwrapExpressionStatement = require('unwrapExpressionStatement')

function Access(id, prop) {
  this.id = id;
  this.prop = prop;
  return this;
}

Access.prototype.compile = function (context) {
  var id = unwrapExpressionStatement(ast(this.id, context))
  var prop = ast(this.prop, context);
  var computed = prop.type === 'Literal'

  return MemberExpression(id, prop, computed);
};

module.exports = Access;
