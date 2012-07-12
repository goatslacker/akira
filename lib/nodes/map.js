var Base = require('./base');

function Map(obj) {
  this.obj = obj;
  return this;
}

Map.prototype.compile = function (context) {
  return {
    type: 'ObjectExpression',
    properties: this.obj ? this.obj.args.map(function (arg) {
      var key;
      var value;

      key = Base.compileValue(arg.id, context);
      value = Base.compileValue(arg.val, context);

      return {
        type: 'Property',
        key: key,
        value: value
      };
    }) : []
  };
};

module.exports = Map;
