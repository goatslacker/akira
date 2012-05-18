var r = {};
var List = Array.prototype;

r.date = function () {
  return Date.now();
};

r.print = function () {
  var args = List.slice.call(arguments, 0);
  console.log.apply(console, args);
  return args;
};

r.mod = function (a, b) {
  return a % b;
};

r.length = function (list) {
  return list.length;
};

r.at = function (list, index) {
  return list[index - 1];
};

r.get = function (obj, prop) {
  return obj[prop];
};

r.call = function (obj, prop) {
  var args = List.slice.call(arguments, 2);
  return obj[prop].apply(obj, args);
};

r.push = function (list, el) {
  list.push(el);
  return list;
};

r.filter = function (fn, list) {
  return List.filter.call(list, function (node, index, list) {
    return fn(node, index + 1, list);
  });
};

r.map = function (fn, list) {
  return List.map.call(list, function (node, index, list) {
    return fn(node, index + 1, list);
  });
};

r.foldl = function (fn, list) {
  return List.reduce.call(list, fn);
};

r.foldr = function (fn, list) {
  return List.reduceRight.call(list, fn);
};

r.range = function (a, b, fn) {
  var list = [];
  for (var i = a; i <= b; i += 1) {
    list.push(fn ? fn(i) : i);
  }
  return list;
};

r.regexp = function (regexp, opts) {
  return new RegExp(regexp, opts);
};

module.exports = r;
