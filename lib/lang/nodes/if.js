var CallExpression = require('ast/CallExpression');
var ExpressionStatement = require('ast/ExpressionStatement')
var FunctionExpression = require('ast/FunctionExpression');
var ast = require('ast');
var implicitReturn = require('implicitReturn');
var makeArray = require('makeArray')

function block(stmt) {
  return {
    type: 'BlockStatement',
    body: makeArray(ExpressionStatement(stmt))
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
