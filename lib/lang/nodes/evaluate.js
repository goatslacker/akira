var Base = require('./base');
var esprima = require('esprima');
var util = require('util');

function Evaluate(expr, evl) {
  this.expr = expr;
  this.evl = evl;
  return this;
}

Evaluate.prototype.compile = function (context) {
  var a = Base.compileValue(this.expr, context);

  if (this.evl) {
    return {
      __akira: a,
    };
  }

  return esprima.parse('(' + Base.obj2str(a) + ')').body[0].expression;
};

module.exports = Evaluate;
