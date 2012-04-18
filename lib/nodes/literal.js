var Base = require('./base');

var Literal = function (lit) {
  this.literal = lit;
  return this;
};

Literal.prototype = Base.extend({
  dump: function () {
    return this.literal;
  },
  compile: function () {
    return { type: 'Literal', value: this.literal };
  },
  run: function () {
    return this.literal;
  }
});

module.exports = Literal;
