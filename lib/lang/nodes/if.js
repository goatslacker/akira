var Base = require('./base');
var ast = require('ast');
var implicitReturn = require('implicitReturn');
var FunctionExpression = require('ast/FunctionExpression');
var CallExpression = require('ast/CallExpression');

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
    test: ast(this.condition, context),
    consequent: block(ast(this.then, context)),
    alternate: block(ast(this.els, context))
  }];

  implicitReturn(body);

  return CallExpression(FunctionExpression(
    null,
    [],
    body
  ), []);
};

module.exports = If;
