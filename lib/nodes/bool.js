const Base = require('./base');

var Bool = function (bool) {
  this.bool = (bool === "true");
  return this;
};

Bool.prototype = Base.extend({
  dump: function () {
    return this.bool;
  },
  run: function () {
    return this.bool;
  }
});

module.exports = Bool;
