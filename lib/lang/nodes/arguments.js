var Base = require('./base');
var ast = require('ast');

function Arguments() {
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
}

Arguments.prototype.compile = function (context) {
  return this.args.map(function (arg) {
    return ast(arg, context);
  });
};

module.exports = Arguments;
