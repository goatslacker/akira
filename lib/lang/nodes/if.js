var IfStatement = require('ast/IfStatement')
var ast = require('ast');
var betaRedex = require('betaRedex')
var implicitReturn = require('implicitReturn');

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

  return betaRedex(body)
};

module.exports = If;
