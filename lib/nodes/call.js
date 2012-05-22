var Base = require('./base');

var Call = function (ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
};

Call.prototype = Base.extend({
  compile: function (context) {
    return Base.functioncall(context, this.ref, this.params);
  }
});

module.exports = Call;
