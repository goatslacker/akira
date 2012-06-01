exports.eq = function eq(a, b) {
  return a === b;
};

exports.neq = function neq(a, b) {
  return a !== b;
};

exports.gt = function gt(a, b) {
  return a > b;
};

exports.lt = function gt(a, b) {
  return a < b;
};

exports.assert = function assert(eq) {
  if (!eq) {
    throw new Error(eq);
  }
};

exports.arrEq = function arrEq(arr, arr_eq) {
  return arr.filter(function (x, i) {
    return x === arr_eq[i];
  }).length === arr.length;
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
