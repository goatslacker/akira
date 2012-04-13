var r = {};
var List = Array.prototype;

var Base = require('./nodes/base');
var Call = require('./nodes/call');
var Arguments = require('./nodes/arguments');
var Literal = require('./nodes/literal');

r.date = function () {
  return Date.now();
};

r.print = function () {
  var args = List.slice.call(arguments, 0);
  console.log(args);
  return args;
};

r.sum = function () {
  return List.reduce.call(arguments, function (a, b) {
    return a + b;
  });
};

r.prod = function () {
  return List.reduce.call(arguments, function (a, b) {
    return a * b;
  });
};

r.assert = function (comparison) {
  if (!comparison) {
    throw new Error('Failed');
  }
  return comparison;
};

r.mod = function (a, b) {
  return a % b;
};

r.if = function (c, a, b) {
  if (c) return a;
  else return b;
};

r.return = function (val) {
  return val;
};

r.push = function (a) {
  var args = List.slice.call(arguments, 1);
  args.push(a);

  return args;
};

r.length = function (list) {
  return list.length;
};

r.at = function (list, index) {
  return list[index - 1];
};

r.filter = function (list, fn) {
  return list.filter(function (arg, index) {
    var context = { anon: fn };
    var call = new Call('anon', new Arguments(new Literal(arg), new Literal(index)));
    return Base.getValue(call, [context]);
  });
};

module.exports = r;
