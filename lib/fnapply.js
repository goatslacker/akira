var Base = require('./nodes/base');
var Call = require('./nodes/call');
var Arguments = require('./nodes/arguments');
var Literal = require('./nodes/literal');

function Args() { }
Args.prototype = Arguments.prototype;
Args.create = function (args) {
  var map = Array.prototype.map;

  return Arguments.apply(new Args(), map.call(args, function (arg) {
    return new Literal(arg);
  }));
};

module.exports = function (fn) {
  return function () {
    var value = new Call('anon', Args.create(arguments));
    return Base.getValue(value, [{ anon: fn }]);
  };
};
