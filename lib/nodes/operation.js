var Base = require('./base');

var Operation = function (a, op, b) {
  this.operators = [a, b];
  this.operation = op;
};

Operation.prototype.compile = function (context) {
  return Base.binary.apply(null, [context, this.operation].concat(this.operators));
};

module.exports = Operation;
