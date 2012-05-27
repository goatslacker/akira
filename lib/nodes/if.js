var Base = require('./base');

function block(stmt) {
  var expr = [{
    type: 'ExpressionStatement',
    expression: stmt
  }];
  if (Array.isArray(stmt)) {
    expr = stmt;
  } else if (stmt.type === 'IfStatement') {
    expr = [stmt];
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

If.prototype.compile = function (context) {
  return {
    type: 'IfStatement',
    test: Base.compileValue(this.condition, context),
    consequent: block(Base.compileValue(this.then, context)),
    alternate: block(Base.compileValue(this.els, context))
  };
};

module.exports = If;
