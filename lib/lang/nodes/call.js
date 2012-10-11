var Base = require('./base');

function Call(ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
}

Call.prototype.compile = function (context) {
  return Base.functioncall(context, this.ref, this.params);
};

module.exports = Call;
