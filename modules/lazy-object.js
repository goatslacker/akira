function LazyObject(ds) {
  this.ds = ds;
  this.keys = Object.keys(ds);

  this.keys.forEach(function (key) {
    this[key] = this.ds[key];
  }.bind(this));
}

LazyObject.prototype.filter = function (fn) {
  this.fn = fn;
  return this;
};

LazyObject.prototype.head = function () {
  var fn = this.fn;
  for (var x in this.ds) {
    if (fn(x, this.ds) === true) {
      return x;
    }
  }
};

module.exports = LazyObject;
