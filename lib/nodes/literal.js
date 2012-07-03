var Base = require('./base');

function Literal(lit) {
  this.literal = lit;
  return this;
}

Literal.prototype.compile = function (context) {
  return { type: 'Literal', value: this.literal };
};

module.exports = Literal;
