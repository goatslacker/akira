exports.consts = function consts(a) {
  return a;
};

exports.flip = function flip(f, a, b) {
  return f(b, a);
};

exports.partial = function partial(f) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var args_ = Array.prototype.slice.call(arguments, 0);
    return f.apply(f, args.concat(args_));
  };
};
