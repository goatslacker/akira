var Base = require('./base');

function Compare(a, op, b) {
  this.compare = [a, b];

  switch (op) {
  case '==':
  case 'is':
    op = '===';
    break;
  case '!=':
  case 'isnt':
    op = '!==';
    break;
  case '===':
    op = '==';
    break;
  case '!==':
    op = '!=';
    break;
  case 'not':
    op = '!';
    break;
  }

  this.operation = op;

  return this;
}

Compare.prototype.compile = function (context) {
  if (this.operation === '!') {
    return {
      type: 'UnaryExpression',
      operator: this.operation,
      argument: Base.compileValue(this.compare[0], context)
    };
  }
  return Base.binary.apply(null, [context, this.operation].concat(this.compare));
};

module.exports = Compare;
