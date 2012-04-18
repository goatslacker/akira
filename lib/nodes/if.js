const Base = require('./base');

var If = function (condition, then, els) {
  this.condition = condition;
  this.then = then;
  this.els = els;
  return this;
};

If.prototype = Base.extend({
  run: function (context) {
    var isTrue = Base.getValue(this.condition, context);
    if (isTrue === true) {
      return Base.getValue(this.then, context);
    } else {
      return Base.getValue(this.els, context);
    }
  }
});

module.exports = If;
