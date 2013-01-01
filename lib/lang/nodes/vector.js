function Vector() {
  var flatten = function (vector) {
    var myvector = [];
    vector.forEach(function (arg) {
      if (arg instanceof Vector) {
        myvector = myvector.concat(flatten(arg.vector));
      } else {
        myvector.push(arg);
      }
    });
    return myvector;
  };

  this.vector = flatten(Array.prototype.slice.call(arguments, 0));
  return this;
}

Vector.prototype.compile = function (context) {
  var vector = this.vector.map(function (arg) {
    return arg.compile(context);
  }).pop();
  return {
    type: 'ArrayExpression',
    elements: vector || []
  };
};

module.exports = Vector;
