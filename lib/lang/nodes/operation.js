var ArrayExpression = require('ast/ArrayExpression');
var BinaryExpression = require('ast/BinaryExpression');
var CallExpression = require('ast/CallExpression');
var Identifier = require('ast/Identifier');
var Literal = require('ast/Literal')
var MemberExpression = require('ast/MemberExpression');
var TypeSystem = require('TypeSystem');
var ast = require('ast');

function math(op, left, right, context, line) {
  switch (op) {
  case '+':
  case '-':
  case '*':
  case '/':
    var types = [TypeSystem.infer(left, context), TypeSystem.infer(right, context)]
    var validTypes = types.filter(function (x) { return typeof(x) !== 'object' })
    validTypes.forEach(function (type) {
      if (type !== 'number') {
        throw new TypeError('Expected number but got ' + type + ' at ' + context.$$$filename + ':' + line)
      }
    })
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

function concat(a, b) {
  // optimize concatenation
  // if the next operation is also a concat
  // eval it and pull the object and the arguments
  // and concat those arguments with the current arguments
  // so a concat looks like this: [1].concat([2], [3], [4])
  // instead of [1].concat([2]).concat([3]).concat([4])
  if (a.type === 'CallExpression' && a.callee.type === 'MemberExpression' &&
      a.callee.property.type === 'Identifier' &&
      a.callee.property.name === 'concat') {
    return doConcat(
      a.callee.object,
      a.arguments.concat([b])
    );
  }

  if (a.type == 'Literal'
      && b.type == 'Literal'
      && typeof a.value == 'string'
      && typeof b.value == 'string'
  ) {
    return Literal(a.value + b.value)
  }

  return doConcat(
    a,
    [b]
  );
}

function Operation(a, op, b) {
  this.operators = [a, b];
  this.operation = op;
}

Operation.prototype.compile = function (context) {
  var left = ast(this.operators[0], context);
  var right = ast(this.operators[1], context);

  switch (this.operation) {
  case '::':
    return Literal(TypeSystem.infer(left, context))
  case '++':
    return concat(left, right);
  case '+:':
    return CallExpression(
      MemberExpression(
        ArrayExpression([left]),
        Identifier('concat')
      ),
      [right]
    );
  case '!!':
    return MemberExpression(
      left,
      right,
      true
    );
  case '*':
    if (left.type === 'Literal' && typeof left.value === 'string') {
      return CallExpression(
        MemberExpression({
          type: 'NewExpression',
          callee: Identifier('Array'),
          arguments: [BinaryExpression(
            '+',
            ast('1', {}),
            right
          )]
        }, Identifier('join')),
        [left]
      );
    }
    break;
  case '**':
    return CallExpression(
      MemberExpression(
        Identifier('Math'),
        Identifier('pow')
      ), [
        left,
        right
      ]
    );
  default:
    return math(this.operation, left, right, context, this.line);
  }

  return BinaryExpression(
    this.operation,
    left,
    right
  );
};

module.exports = Operation;
