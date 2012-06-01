exports.square = function square(x) {
  return x * x;
};

exports.sum = function sum() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
    return a + b;
  });
};

exports.sub = function sub() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
    return a - b;
  });
};

exports.prod = function prod() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
    return a * b;
  });
};

exports.div = function div() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
    return a / b;
  });
};

exports.mod = function mod(a, b) {
  return a % b;
};

exports.even = function even(n) {
  return n % 2 === 0;
};

exports.odd = function odd(n) {
  return n % 2 !== 0;
};

exports.abs = function abs(n) {
  return Math.abs(n);
};
