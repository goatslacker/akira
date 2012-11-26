var Base = require('./base');

var table = {
  '&&': 'and',
  '||': 'or'
}

function Logic(a, op, b) {
  this.compare = [a, b];
  this.operation = op;

  return this;
}

Logic.prototype.compile = function (context) {
  return {
    type: 'LogicalExpression',
    operator: this.operation,
    left: Base.compileValue(this.compare[0], context),
    right: Base.compileValue(this.compare[1], context)
  };
};

module.exports = Logic;
