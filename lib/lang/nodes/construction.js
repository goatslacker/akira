var Base = require('./base');
var ast = require('ast');

function Construction(id) {
  this.id = id;
  return this;
}

Construction.prototype.compile = function (context) {
  var call = ast(this.id, context);
  call.type = 'NewExpression';
  return call;
};

module.exports = Construction;
