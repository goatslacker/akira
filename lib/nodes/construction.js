var Base = require('./base');

function Construction(id) {
  this.id = id;
  return this;
}

Construction.prototype.compile = function (context) {
  var call = Base.compileValue(this.id, context);
  call.type = 'NewExpression';
  return call;
};

module.exports = Construction;
