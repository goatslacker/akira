var r = {};
var List = Array.prototype;

//var fnapply = require('./fnapply');
var fnapply = function (f) {
  return f;
};

r.date = function () {
  return Date.now();
};

r.print = function () {
  var args = List.slice.call(arguments, 0);
  console.log.apply(console, args);
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

r.mod = function (a, b) {
  return a % b;
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
  return list.filter(function (node, index, list) {
    return fn(node, index + 1, list);
  });
};

r.map = function (fn, list) {
  return list.map(function (node, index, list) {
    return fn(node, index + 1, list);
  });
};

r.foldl = function (fn, list) {
  return list.reduce(fn);
};

r.foldr = function (fn, list) {
  return list.reduceRight(fn);
};

r.range = function (a, b, fn) {
  var list = [];
  for (var i = a; i <= b; i += 1) {
    list.push(fn ? fnapply(fn)(i) : i);
  }
  return list;
};

// TODO
r.flatten = function (list) {
  return list.slice(0);
};

module.exports = r;
