var CallExpression = require('ast/CallExpression');
var ExpressionStatement = require('ast/ExpressionStatement')
var FunctionExpression = require('ast/FunctionExpression');
var IfStatement = require('ast/IfStatement')
var ast = require('ast');
var implicitReturn = require('implicitReturn');
var makeArray = require('makeArray')

function If(condition, then, els) {
  this.condition = condition;
  this.then = then;
  this.els = els;
  return this;
}

If.prototype.compile = function (context) {
  var consequent = ast(this.then, context)
  var alternate = ast(this.els, context)
  var test = ast(this.condition, context)

  var cond = IfStatement(test, consequent, alternate)

  if (cond.type === 'ConditionalExpression') {
    return cond
  }

  var body = [cond]

  implicitReturn(body);

  return CallExpression(FunctionExpression(
    null,
    [],
    body
  ), []);
};

module.exports = If;
