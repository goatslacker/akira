var Base = require('./base');

var Pipeline = function (ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
};

Pipeline.prototype.compile = function (context) {
  var params = this.params.params;
  if (params) {
    var i = params.args.indexOf('@');
    params.args[i] = this.ref;
    return Base.functioncall(context, this.params.ref, this.params.params);
  }

  return Base.functioncall(context, this.params, this.ref);
};

module.exports = Pipeline;
