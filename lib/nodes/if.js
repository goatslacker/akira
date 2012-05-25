var Base = require('./base');

// TODO return last stmt
function block(stmt) {
  var expr = [{
    type: 'ExpressionStatement',
    expression: stmt
  }];
  if (Array.isArray(stmt)) {
    expr = stmt;
  }
  return {
    type: 'BlockStatement',
    body: expr
  };
}

var If = function (condition, then, els) {
  this.condition = condition;
  this.then = then;
  this.els = els;
  return this;
};

If.prototype = Base.extend({
  compile: function (context) {
    return {
      type: 'IfStatement',
      test: Base.compileValue(this.condition, context),
      consequent: block(Base.compileValue(this.then, context)),
      alternate: block(Base.compileValue(this.els, context))
    };
  }
});

module.exports = If;
