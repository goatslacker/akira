var Base = require('./base');

var Tuple = function (obj) {
  this.obj = obj;
  return this;
};

Tuple.prototype = Base.extend({
  compile: function (context) {
    return {
      type: 'ObjectExpression',
      properties: this.obj.args.map(function (arg) {
        return {
          type: 'Property',
          key: Base.compileValue(arg.id),
          value: Base.compileValue(arg.val)
        };
      })
    };
  },
  run: function (context) {
    // TODO make sure duplicates aren't allowed
    var val = this.obj.args.map(function (arg) {
      return Base.getValue(arg, context);
    });
    return val;
  }
});

module.exports = Tuple;
