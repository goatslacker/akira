var ast = require('ast');
var esprima = require('esprima');
var obj2str = require('obj2str');
var util = require('util');

function Evaluate(expr, evl) {
  this.expr = expr;
  this.evl = evl;
  return this;
}

Evaluate.prototype.compile = function (context) {
  var a = ast(this.expr, context);

  if (this.evl) {
    return {
      __akira: a
    };
  }

  return esprima.parse('(' + obj2str(a) + ')').body[0].expression;
};

module.exports = Evaluate;
