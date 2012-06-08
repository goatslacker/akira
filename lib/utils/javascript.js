exports.mod = function mod(a, b) {
  return a % b;
};

exports.set = function set(obj, prop, val) {
  var tmp = Object.create(obj);
  tmp[prop] = val;
  return tmp;
};

exports.call = function call(obj, prop) {
  var args = Array.prototype.slice.call(arguments, 2);
  return obj[prop].apply(obj, args);
};

exports.cons = function cons() {
  var els = Array.prototype.slice.call(arguments, 0);
  var list = els.pop().slice(0);
  var i = els.length;
  while (i) {
    i -= 1;
    list.unshift(els[i]);
  }
  return list;
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

exports.sort = function sort(fn, list) {
  return Array.prototype.sort.call(list.slice(0), function (a, b) {
    return fn(a, b);
  });
};

exports.merge = function merge(base, obj) {
  Object.keys(obj).forEach(function (key) { base[key] = obj[key] });
};

exports.joinLines = function joinLines(list) {
  return list.join('\n');
};

exports.loop = function loop(fn, start, end, by) {
  by = by || 1;
  for (var i = start; i <= end; i += by) fn(i);
};

exports.partial = function partial(f) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var args_ = Array.prototype.slice.call(arguments, 0);
    return f.apply(f, args.concat(args_));
  };
};

exports.print = function print() {
  var args;
  if (typeof console !== 'undefined') {
    args = Array.prototype.slice.call(arguments, 0);
    console.log.apply(console, args);
  }
  return args;
};

exports.raise = function raise(msg, error) {
  error = error || Error;
  throw error(msg);
};
