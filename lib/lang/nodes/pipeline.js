var Base = require('./base');
var CallExpression = require('ast/CallExpression');

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

  var callee = Base.compileValue(this.params, context);
  var args = [Base.compileValue(this.ref, context)];

  return CallExpression(callee, args);
};

module.exports = Pipeline;
