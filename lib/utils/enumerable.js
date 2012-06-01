exports.head = function head(list) {
  return list[0];
};

exports.init = function init(list) {
  return list.slice(0, list.length - 1);
};

exports.tail = function tail(list) {
  return list.slice(1, list.length);
};

exports.last = function last(list) {
  return list[list.length - 1];
};

exports.at = function at(list, index) {
  return list[index - 1];
};

exports.get = function get(obj, prop) {
  return obj[prop];
};

exports.set = function set(obj, prop, val) {
  return obj[prop] = val;
};

exports.call = function call(obj, prop) {
  var args = Array.prototype.slice.call(arguments, 2);
  return obj[prop].apply(obj, args);
};

exports.length = function length(list) {
  return list.length;
};

exports.pop = function pop(list) {
  return list.pop();
};

exports.join = function join(by, list) {
  return list.join(by);
};

exports.concat = function concat() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
    return a.concat(b);
  });
};

exports.filter = function filter(fn, list) {
  return Array.prototype.filter.call(list, function (node, index, list) {
    return fn(node, index + 1, list);
  });
};

exports.map = function map(fn, list) {
  return Array.prototype.map.call(list, function (node, index, list) {
    return fn(node, index + 1, list);
  });
};

exports.foldl = function foldl(fn, list) {
  return Array.prototype.reduce.call(list, fn);
};

exports.foldr = function foldr(fn, list) {
  return Array.prototype.reduceRight.call(list, fn);
};

exports.range = function range(fn, a, b) {
  var list = [];
  for (var i = a; i <= b; i += 1) {
    list.push(fn ? fn(i) : i);
  }
  return list;
};

exports.take = function take(n, from) {
  return from.slice(0, n);
};

exports.drop = function drop(n, from) {
  var copy = from.slice(0)
  copy.splice(0, n);
  return copy;
};

exports.any = function any(fn, list) {
  return Array.prototype.some.call(list, function (node, index, list) {
    return fn(node, index + 1, list);
  });
};

exports.every = function every(fn, list) {
  return Array.prototype.every.call(list, function (node, index, list) {
    return fn(node, index + 1, list);
  });
};

exports.count = function count(fn, list) {
  return Array.prototype.filter.call(list, function (node, index, list) {
    return fn(node, index + 1, list);
  }).length;
};

exports.sort = function sort(fn, list) {
  return Array.prototype.sort.call(list, function (a, b) {
    return fn(a, b);
  });
};
