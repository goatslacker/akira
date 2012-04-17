var Base = require('./base');

var Assignment = function (id, val) {
  this.id = id;
  this.val = val;
  return this;
};

Assignment.prototype = Base.extend({
  compile: function (context) {
    var result = Base.getValue(this.val, context);
    if (context[context.length - 1][this.id]) {
      throw new ReferenceError(this.id + ' is already defined');
    }
    Base.setValue(this.id, result, context);
    var compiled = Base.compileValue(this.val, context);
    return this.id + ' = ' + compiled;
  },
  run: function (context) {
    var result = Base.getValue(this.val, context);
    if (context[context.length - 1][this.id]) {
      throw new ReferenceError(this.id + ' is already defined');
    }
    Base.setValue(this.id, result, context);
    return result;
  }
});

module.exports = Assignment;
