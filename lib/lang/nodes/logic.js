var ast = require('ast');

var table = {
  '&&': 'and',
  '||': 'or'
};

function Logic(a, op, b) {
  this.compare = [a, b];
  this.operation = op;

  return this;
}

Logic.prototype.compile = function (context) {
  var compare = table[this.compare[0]];

  if (compare) {
    return { type: 'Identifier', name: compare, __core: true };
  }

  return {
    type: 'LogicalExpression',
    operator: this.operation,
    left: ast(this.compare[0], context),
    right: ast(this.compare[1], context)
  };
};

module.exports = Logic;
