var Base = require('./base');

var performOperation = function (a, b, op) {
  var result = 0;

  switch (op) {
  case "+":
    result = a + b;
    break;
  case "-":
    result = a - b;
    break;
  case "*":
    result = a * b;
    break;
  case "/":
    result = a / b;
    break;
  }

  return result;
};

var Operation = function (a, op, b) {
  this.operators = [a, b];
  this.operation = op;
};

Operation.prototype = Base.extend({
  dump: function () {
    var operators = this.operators.slice(0);
    var a = operators.shift();
    var b = operators.shift();

    a = a.dump();
    b = b.dump();

    return performOperation(a, b, this.operation);
  },

  compile: function (context) {
    var operators = this.operators.slice(0);
    var a = operators.shift();
    var b = operators.shift();

    a = Base.compileValue(a, context);
    b = Base.compileValue(b, context);

    return {
      type: 'BinaryExpression',
      operator: this.operation,
      left: a,
      right: b
    };
  },

  run: function (context) {
    var operators = this.operators.slice(0);
    var a = operators.shift();
    var b = operators.shift();

    a = Base.getValue(a, context);
    b = Base.getValue(b, context);

    return performOperation(a, b, this.operation);
  }
});

module.exports = Operation;
