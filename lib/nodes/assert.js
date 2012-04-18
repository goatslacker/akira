var Base = require('./base');
var Compare = require('./compare');

var Assert = function (a, compare, b) {
  this.a = a;
  this.b = b;
  this.op = compare;
  this.comparison = new Compare(a, compare, b);
  return this;
};

Assert.prototype = Base.extend({
  run: function (context) {
    var result = Base.getValue(this.comparison, context);
    var a = Base.getValue(this.a, context);
    var b = Base.getValue(this.b, context);
    if (!result) {
      throw new Error('Expected ' + a + ' to be ' + this.op + ' ' + b);
    }
    return result;
  }
});

module.exports = Assert;
