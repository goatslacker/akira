var Base = require('./base');

var Call = function (ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
};

Call.prototype.compile = function (context) {
//  console.log('@', this.ref, this.params);
  return Base.functioncall(context, this.ref, this.params);
};

module.exports = Call;
