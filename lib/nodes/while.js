const Base = require('./base');

var While = function (op, block) {
  this.op = op;
  this.block = block;
  return this;
};

While.prototype = Base.extend({
  run: function (context) {
    while (Base.getValue(this.op, context)) {
      var result = this.block.run(context);
    }

    return result;
  }
});

module.exports = While;
