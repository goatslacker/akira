var ast = require('ast');
var createFunction = require('z/createFunction');

function Declaration(lambda, params, body) {
  this.lambda = lambda;
  this.params = params;
  this.body = body;
  return this;
}

Declaration.prototype.compile = function (context) {
  var scope = {
    $$$filename: context.$$$filename,
    $$$line: this.line,
    $$$params: this.params
  };
  return createFunction(ast(this.params, scope), ast(this.body, scope), scope);
};

module.exports = Declaration;
