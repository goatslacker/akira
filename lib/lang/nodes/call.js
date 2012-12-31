var Base = require('./base');
var TypeSystem = require('TypeSystem');
var CallExpression = require('ast/CallExpression');

function checkCallType(name, params, context, line) {
  if (!TypeSystem._types.hasOwnProperty(name)) {
    return;
  }

  var type = TypeSystem._types[name];

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
  if (this.params === 'apply') {
    this.params = context.$$$params;
  }

  var callee = Base.compileValue(this.ref, context);
  var args = Base.compileValue(this.params, context);

  checkCallType(this.ref.name, args, context, this.line);

  return CallExpression(callee, args);
};

module.exports = Call;
