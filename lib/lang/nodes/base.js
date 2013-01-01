function a(fn) {
  return function (context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return fn.apply(fn, args.map(function (arg) {
      return ast(arg, context);
    }).concat([context]));
  };
}

module.exports = {};
