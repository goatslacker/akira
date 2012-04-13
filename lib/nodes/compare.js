var Base = require('./base');

var makeComparison = function (a, b, op) {

  var result = false;

  switch (op) {
  case "==":
    result = (a === b);
    break;
  case "!=":
    result = (a !== b);
    break;
  case "and":
  case "&&":
    result = (a && b);
    break;
  case "or":
  case "||":
    result = (a || b);
    break;
  case ">":
    result = (a > b);
    break;
  case "<":
    result = (a < b);
    break;
  case "<=":
    result = (a <= b);
    break;
  case ">=":
    result = (a >= b);
    break;
  }

  return result;
};

var Compare = function (a, op, b) {
  this.compare = [a, b];
  this.operation = op;

  return this;
};

Compare.prototype = Base.extend({
  dump: function () {
    var comparison = this.compare.slice(0);
    var a = comparison.shift();
    var b = comparison.shift();

    a = a.dump();
    b = b.dump();

    return makeComparison(a, b, this.operation);
  },

  run: function (context) {
    var operators = this.compare.slice(0);
    var a = operators.shift();
    var b = operators.shift();

    a = Base.getValue(a, context);
    b = Base.getValue(b, context);

    return makeComparison(a, b, this.operation);
  }
});

module.exports = Compare;
