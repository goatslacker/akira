var Base = require('./base');

var Compare = function (a, op, b) {
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
    op = '=='
    break;
  case '!==':
    op = '!='
    break;
  }

  this.operation = op;

  return this;
};

Compare.prototype.compile = function (context) {
  return Base.binary.apply(null, [context, this.operation].concat(this.compare));
};

module.exports = Compare;
