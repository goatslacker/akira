var CallExpression = require('ast/CallExpression');
var ast = require('ast');
var inline = require('inline');

function pushLastCall(node) {
  if (node.callee.type == 'CallExpression') {
    return CallExpression(
      node.callee.callee,
      node.callee.arguments.concat(node.arguments)
    )
  }
  return node
}

function Pipeline(ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
}

Pipeline.prototype.compile = function (context) {
  var params = this.params;

  var inlined = inline(params, this.ref, context);

  if (inlined) {
    return inlined;
  }

  var callee = ast(this.params, context);
  var args = [ast(this.ref, context)];

  return inline.x(pushLastCall(CallExpression(callee, args)))
};

module.exports = Pipeline;
