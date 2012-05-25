var Base = require('./base');

var Compare = function (a, op, b) {
  this.compare = [a, b];
  this.operation = op;

  return this;
};

Compare.prototype.compile = function (context) {
  return Base.binary.apply(null, [context, this.operation].concat(this.compare));
};

module.exports = Compare;
