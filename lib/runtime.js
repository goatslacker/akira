var r = {};
var List = Array.prototype;

var fnapply = require('./fnapply');

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

r.push = function (list, el) {
  list.push(el);
  return list;
};

r.filter = function (fn, list) {
  return list.filter(fnapply(fn));
};

r.map = function (fn, list) {
  console.log(list);
  return list.map(fnapply(fn));
};

r.foldl = function (fn, list) {
  return list.reduce(fnapply(fn));
};

r.foldr = function (fn, list) {
  return list.reduceRight(fnapply(fn));
};

r.range = function (a, b, fn) {
  var list = [];
  for (var i = a; i <= b; i += 1) {
    list.push(fn ? fnapply(fn)(i) : i);
  }
  return list;
};

module.exports = r;
