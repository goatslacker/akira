var Base = require('./base');
var esprima = require('esprima');
var util = require('util');
var obj2str = require('obj2str');
var ast = require('ast');

function Evaluate(expr, evl) {
  this.expr = expr;
  this.evl = evl;
  return this;
}

Evaluate.prototype.compile = function (context) {
  var a = ast(this.expr, context);

  if (this.evl) {
    return {
      __akira: a,
    };
  }

  return esprima.parse('(' + obj2str(a) + ')').body[0].expression;
};

module.exports = Evaluate;
