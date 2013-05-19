var Literal = require('ast/Literal');
var ObjectExpression = require('ast/ObjectExpression')
var ast = require('ast');

function Map(obj) {
  this.obj = obj;
}

Map.prototype.compile = function (context) {
  var properties;
  if (this.obj) {
    properties = this.obj.args.map(function (arg) {
      var key, value;
      key = ast(arg.id, context);
      if (arg.val === null) {
        if (context[arg.id.name]) {
          value = key;
        } else {
          value = Literal(arg.id.name);
        }
      } else {
        value = ast(arg.val, context);
      }

      return [key, value]
    });
  } else {
    properties = [];
  }

  return ObjectExpression(properties)
};

module.exports = Map;
