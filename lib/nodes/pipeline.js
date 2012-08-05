var Base = require('./base');

function Pipeline(ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
}

Pipeline.prototype.compile = function (context) {
  if (this.params.ref) {
    this.params.params.args.push(this.ref);
    return Base.compileValue(this.params, context);
  }

  return Base.functioncall(context, this.params, this.ref);
};

module.exports = Pipeline;
