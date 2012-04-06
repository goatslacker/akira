var r = {};

r.date = function () {
  return Date.now();
};

r.print = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  console.log(args);
};

r.sum = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  return args.reduce(function (a, b) { return a + b });
};

r.assert = function (comparison) {
  if (!comparison) {
    throw new Error('Failed');
  }
};

r.mod = function (a, b) {
  return a % b;
};

module.exports = r;
