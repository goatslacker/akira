var Base = require('./base');

// TODO return last stmt
function block(stmt) {
  return {
    type: 'BlockStatement',
    body: [{
      type: 'ExpressionStatement',
      expression: stmt
    }]
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
  },
  run: function (context) {
    var isTrue = Base.getValue(this.condition, context);
    if (isTrue === true) {
      return Base.getValue(this.then, context);
    } else {
      return Base.getValue(this.els, context);
    }
  }
});

module.exports = If;
