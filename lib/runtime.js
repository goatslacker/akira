var r = {};
var List = Array.prototype;

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

r.last = function () {
  return arguments[arguments.length - 1];
};

r.length = function (list) {
  return list.length;
};

module.exports = r;
