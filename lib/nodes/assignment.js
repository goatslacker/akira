const Base = require('./base');

var Assignment = function (id, val) {
  this.id = id;
  this.val = val;
  return this;
};

Assignment.prototype = Base.extend({
  run: function (context) {
    var result = Base.getValue(this.val, context);
    Base.setValue(this.id, result, context);
    return result;
  }
});

module.exports = Assignment;
