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
