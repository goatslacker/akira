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
  run: function (context) {
    var args = this.args.slice(0);
    args.forEach(function (arg, index) {
      args[index] = Base.getValue(arg, context);
    });
    return args;
  }
});

module.exports = Arguments;
