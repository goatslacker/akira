var Base = require('./base');
var CallExpression = require('ast/CallExpression');
var inline = require('inline');
var ast = require('ast');

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
    return ast(params, context);
  }

  var inlined = inline(params, this.ref, context);

  if (inlined) {
    return inlined;
  }

  var callee = ast(this.params, context);
  var args = [ast(this.ref, context)];

  return CallExpression(callee, args);
};

module.exports = Pipeline;
