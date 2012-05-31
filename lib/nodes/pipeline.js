var Base = require('./base');

var Pipeline = function (ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
};

Pipeline.prototype.compile = function (context) {
  var params = this.params.params.args;
  var i = params.indexOf('@');
  params[i] = this.ref;
  return Base.functioncall(context, this.params.ref, this.params.params);
};

module.exports = Pipeline;
