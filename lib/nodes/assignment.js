var Base = require('./base');

var Assignment = function (id, val) {
  this.id = id;
  this.val = val;
  return this;
};

Assignment.prototype = Base.extend({
  compile: function (context) {
    if (context[this.id]) {
      throw new ReferenceError(this.id + ' is already defined');
    }
    context[this.id] = true;

    return Base.assignment(context, this.id, this.val);
  }
});

module.exports = Assignment;
