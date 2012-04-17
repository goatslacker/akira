var Base = require('./base');
var Literal = require('./literal');

var Arguments = function () {
  var flatten = function (args) {
    var myargs = [];
    args.forEach(function (arg) {
      if (arg instanceof Arguments) {
        myargs = myargs.concat(flatten(arg.args));
      } else {
        myargs.push(arg);
      }
    });
    return myargs;
  };

  this.args = flatten(Array.prototype.slice.call(arguments, 0));
  return this;
};

Arguments.prototype = Base.extend({
  compile: function (context) {
    var val = this.args.map(function (arg) {
      return Base.compileValue(arg, context);
//      return Base.getValue(arg, context);
    });
    return val.toString();
  },
  run: function (context) {
    var val = this.args.map(function (arg) {
      return Base.getValue(arg, context);
    });
    return val;
  }
});

module.exports = Arguments;
