var Base = require('./base');

var Literal = function (lit) {
  this.literal = lit;
  return this;
};

Literal.prototype.compile = function (context) {
  return { type: 'Literal', value: this.literal };
};

module.exports = Literal;
