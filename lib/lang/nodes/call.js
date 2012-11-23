var Base = require('./base');

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

  return Base.CallExpression(callee, args);
};

module.exports = Call;
