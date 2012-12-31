var Base = require('./base');
var TypeSystem = require('TypeSystem');

function TypeSignature(iden, params, retval) {
  this.iden = iden;
  this.params = params;
  this.retval = retval;
  return this;
}

TypeSignature.prototype.compile = function (context) {
  if (TypeSystem._types.hasOwnProperty(this.iden.name)) {
    throw new ReferenceError(this.iden.name +
      ' has already been given a type signature at ' + context.$$$filename +
      ' line ' + this.line);
  }

  TypeSystem._types[this.iden.name] = {
    params: this.params.args,
    retval: this.retval
  };
  return [];
};

module.exports = TypeSignature;
