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

function types(type, b, op, context) {
  switch (type) {
    case 'Function':
    case 'Number':
    case 'String':
    case 'Array':
    case 'Object':
    case 'Null':
      return {
        type: 'BinaryExpression',
        operator: op,
        left: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'MemberExpression',
                computed: false,
                object: { type: 'Identifier', name: 'Object' },
                property: { type: 'Identifier', name: 'prototype' }
              },
              property: { type: 'Identifier', name: 'toString' }
            },
            property: { type: 'Identifier', name: 'call' }
          },
          arguments: [Base.compileValue(b, context)]
        },
        right: { type: 'Literal', value: '[object ' + type + ']' }
      };
    default:
      return null;
  }
}

Compare.prototype.compile = function (context) {
  var ret;

  ret = types(this.compare[0].name, this.compare[1], this.operation, context);
  if (ret) return ret;
  ret = types(this.compare[1].name, this.compare[0], this.operation, context);
  if (ret) return ret;

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
