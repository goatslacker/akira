var Base = require('./base');

function Declaration(lambda, params, body) {
  this.lambda = lambda;
  this.params = params;
  this.body = body;
  return this;
}

Declaration.prototype.compile = function (context) {
  return Base.functiondef({ $$$filename: context.$$$filename, $$$params: this.params }, this.lambda, this.params, this.body);
};

module.exports = Declaration;
