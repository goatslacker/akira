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
                  value = {
                      type: 'Literal',
                      value: arg.id.name
                  };
              }
          } else {
              value = ast(arg.val, context);
          }
          return {
              type: 'Property',
              key: key,
              value: value
          };
      });
  } else {
      properties = [];
  }
  return {
      type: 'ObjectExpression',
      properties: properties
  };
};

module.exports = Map;
