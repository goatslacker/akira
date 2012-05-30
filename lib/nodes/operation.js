var Base = require('./base');
var util = require('util');

var Operation = function (a, op, b) {
  this.operators = [a, b];
  this.operation = op;
};

Operation.prototype.compile = function (context) {
  this.operators.forEach(function (op) {
    switch (typeof op.literal) {
    case 'string':
    case 'number':
      return;
    default:
      throw new TypeError('Expected String or Number instead received Boolean');
    }
  });

  if (this.operators.reduce(function (a, b) { return (typeof a.literal) === (typeof b.literal); }) === false) {
    throw new TypeError('Unable to operate on different types: ' + util.inspect(this.operators));
  }

  return Base.binary.apply(null, [context, this.operation].concat(this.operators));
};

module.exports = Operation;
