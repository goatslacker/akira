var Base = require('./base');

var Assignment = function (id, val) {
  this.id = id;
  this.val = val;
  return this;
};

Assignment.prototype = Base.extend({
  compile: function (context) {
    // TODO fix scoping
//    if (context[context.length - 1][this.id]) {
//      throw new ReferenceError(this.id + ' is already defined');
//    }

    return Base.assignment(context, this.id, this.val);
  }
});

module.exports = Assignment;
