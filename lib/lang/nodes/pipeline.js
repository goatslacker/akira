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

  // XXX Deprecated
  // always push result from previous pipe into next function's arguments
  if (params.ref) {
    var ref = this.ref
    var flag = false
    var args = params.params.args.map(function (arg) {
      if (arg.name === '_' && !flag) {
        flag = true
        return ref
      }

      return arg
    }).filter(function (arg) {
      return arg.name !== '_'
    })

    if (flag) {
      params.params.args = args
      return ast(params, context)
    }

    params.params.args.push(this.ref);
    return ast(params, context);
  }

  var inlined = inline(params, this.ref, context);

  if (inlined) {
    return inlined;
  }

  var callee = ast(this.params, context);
  var args = [ast(this.ref, context)];

  return inline.x(pushLastCall(CallExpression(callee, args)))
};

module.exports = Pipeline;
