var Base = require('./base');

var Tuple = function (obj) {
  this.obj = obj;
  return this;
};

Tuple.prototype.compile = function (context) {
  return {
    type: 'ObjectExpression',
    properties: this.obj.args.map(function (arg) {
      return {
        type: 'Property',
        key: Base.compileValue(arg.id, context),
        value: Base.compileValue(arg.val, context)
      };
    })
  };
};

module.exports = Tuple;
