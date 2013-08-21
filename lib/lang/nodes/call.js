var CallExpression = require('ast/CallExpression');
var Identifier = require('ast/Identifier');
var MemberExpression = require('ast/MemberExpression');
var Store = require('Store');
var TypeSystem = require('TypeSystem');
var ast = require('ast');
var unwrapExpressionStatement = require('unwrapExpressionStatement')

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
}

function Call(ref, params) {
  return function (line, context) {
    var callee = ast(ref, context);

    if (params === 'apply') {
      params = context.$$$params;
      if (!params) {
        return CallExpression(
          MemberExpression(callee, Identifier('apply')),
          [Identifier('null'), Identifier('arguments')]
        );
      }
    }

    var args = ast(params, context);

    checkCallType(ref.name, args, context, line);

    var unwrappedArguments = args && args.map(unwrapExpressionStatement)

    return CallExpression(callee, unwrappedArguments);
  }
}

module.exports = Call;
