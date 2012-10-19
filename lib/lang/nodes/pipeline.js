var Base = require('./base');

function Pipeline(ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
}

Pipeline.prototype.compile = function (context) {
  var params = this.params;

  // always push result from previous pipe into next function's arguments
  if (params.ref) {
    params.params.args.push(this.ref);
    return Base.compileValue(params, context);
  }

  var inline = Base.inline(params, this.ref, context);

  if (inline) {
    return inline;
  }

  return Base.functioncall(context, this.params, this.ref);
};

module.exports = Pipeline;
