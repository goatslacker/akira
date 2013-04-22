var CallExpression = require('ast/CallExpression');
var Identifier = require('ast/Identifier');
var MemberExpression = require('ast/MemberExpression');
var Store = require('Store');
var TypeSystem = require('TypeSystem');
var ast = require('ast');

function checkCallType(name, params, context, line) {
  if (!Store.types.hasOwnProperty(name)) {
    return;
  }

  var type = Store.types[name];

  if (!type.params) {
    return;
  }

  if (type.params.length !== params.length) {
    // FIXME provide a Base function for warnings.
    console.warn(name + ' was signed with ' + type.params.length +
      ' arguments yet it was provided with ' + params.length + ' at ' +
      context.$$$filename + ' line ' + line);
  }

  params.forEach(function (param, i) {
    TypeSystem.checkType(
      param,
      type.params[i].name.toLowerCase(),
      context,
      line
    );
  });
}

function Call(ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
}

Call.prototype.compile = function (context) {
  var callee = ast(this.ref, context);

  if (this.params === 'apply') {
    this.params = context.$$$params;
    if (!this.params) {
      return CallExpression(
        MemberExpression(callee, Identifier('apply')),
        [Identifier('null'), Identifier('arguments')]
      );
    }
  }

  var args = ast(this.params, context);

  checkCallType(this.ref.name, args, context, this.line);

  var xargs = args && args.map(function (arg) {
    if (Array.isArray(arg)) {
      if (arg[0].type === 'ExpressionStatement') {
        return arg[0].expression;
      }
      return null;
    } else {
      return arg;
    }
  });

  return CallExpression(callee, xargs);
};

module.exports = Call;
