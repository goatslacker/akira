var Base = require('./base');
var implicitReturn = require('implicitReturn');

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

function If(condition, then, els) {
  this.condition = condition;
  this.then = then;
  this.els = els;
  return this;
}

If.prototype.compile = function (context) {
  var body = [{
    type: 'IfStatement',
    test: Base.compileValue(this.condition, context),
    consequent: block(Base.compileValue(this.then, context)),
    alternate: block(Base.compileValue(this.els, context))
  }];

  implicitReturn(body);

  return Base.CallExpression(Base.FunctionExpression(
    null,
    [],
    body
  ), []);
};

module.exports = If;
