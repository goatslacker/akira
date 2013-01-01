var BinaryExpression = require('ast/BinaryExpression');
var CallExpression = require('ast/CallExpression');
var Identifier = require('ast/Identifier');
var MemberExpression = require('ast/MemberExpression');
var TypeSystem = require('TypeSystem');
var ast = require('ast');

function math(op, ops, context, line) {
  var left = ast(ops[0], context);
  var right = ast(ops[1], context);

  switch (op) {
  case '+':
  case '-':
  case '*':
  case '/':
    TypeSystem.checkType(left, 'number', context, line);
    TypeSystem.checkType(right, 'number', context, line);
    break;
  }

  return BinaryExpression(op, left, right);
}

function doConcat(obj, arg) {
  return CallExpression(
    MemberExpression(
      obj,
      Identifier('concat')
    ),
    arg
  );
}

function concat(context, a, b) {
  // optimize concatenation
  // if the next operation is also a concat
  // eval it and pull the object and the arguments
  // and concat those arguments with the current arguments
  // so a concat looks like this: [1].concat([2], [3], [4])
  // instead of [1].concat([2]).concat([3]).concat([4])
  var f = ast(a, context);
  if (a.operation && a.operation === '++') {
    return doConcat(
      f.callee.object,
      f.arguments.concat([ast(b, context)])
    );
  }

  return doConcat(
    f,
    [ast(b, context)]
  );
}

function Operation(a, op, b) {
  this.operators = [a, b];
  this.operation = op;
}

Operation.prototype.compile = function (context) {
  switch (this.operation) {
  case '++':
    return concat(context, this.operators[0], this.operators[1]);
  case '+:':
    return CallExpression(
      MemberExpression({
        type: 'ArrayExpression',
        elements: [ast(this.operators[0], context)]
      }, Identifier('concat')),
      [ast(this.operators[1], context)]
    );
  case '!!':
    return MemberExpression(
      ast(this.operators[0], context),
      ast(this.operators[1], context),
      true
    );
  case '*':
    if (this.operators[0].constructor.name === 'Literal' &&
        typeof this.operators[0].literal === 'string') {
      return CallExpression(
        MemberExpression({
          type: 'NewExpression',
          callee: Identifier('Array'),
          arguments: [BinaryExpression(
            '+',
            ast('1', {}),
            ast(this.operators[1], context)
          )]
        }, Identifier('join')),
        [ast(this.operators[0], context)]
      );
    }
    break;
  case '**':
    return CallExpression(
      MemberExpression(
        Identifier('Math'),
        Identifier('pow')
      ), [
        ast(this.operators[0], context),
        ast(this.operators[1], context)
      ]
    );
  default:
    return math(this.operation, this.operators, context, this.line);
  }

  return BinaryExpression(
    this.operation,
    ast(this.operators[0], context),
    ast(this.operators[1], context)
  );
};

module.exports = Operation;
