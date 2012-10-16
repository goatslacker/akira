var Base = require('./base');
var esprima = require('esprima');

function Evaluate(expr, evl) {
  this.expr = expr;
  this.evl = evl;
  return this;
}

Evaluate.prototype.compile = function (context) {
  var a = Base.compileValue(this.expr, context);

  if (this.evl) {
    return a;
  }

  var b = esprima.parse('(' + JSON.stringify(a) + ')');
  return b.body[0].expression;
};

module.exports = Evaluate;
