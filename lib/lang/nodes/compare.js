var Base = require('./base');

var table = {
  '==': 'eq',
  '!=': 'neq',
  '>': 'gt',
  '<': 'lt',
  '>=': 'gte',
  '<=': 'lte',
  '&&': 'and',
  '||': 'or'
}

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
  case '&&':
  case 'and':
    op = '&&';
    break;
  case '||':
  case 'or':
    op = '||';
    break;
  }

  this.operation = op;

  return this;
}

function types(type, b, op, context) {
  if (!type) {
    return null;
  }

  switch (type.name) {
    case 'Function':
    case 'Number':
    case 'String':
    case 'Array':
    case 'Object':
    case 'Null':
      return {
        type: 'BinaryExpression',
        operator: op,
        left: Base.CallExpression({
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
        }, [Base.compileValue(b, context)]),
        right: { type: 'Literal', value: '[object ' + type.name + ']' }
      };
    case 'undefined':
      return {
        type: 'BinaryExpression',
        operator: op,
        left: {
          type: 'UnaryExpression',
          operator: 'typeof',
          argument: Base.compileValue(b, context),
        },
        right: {
          type: 'Literal',
          value: 'undefined'
        }
      };
    default:
      return null;
  }
}

function chainedComp(c, op, context) {
  if (!c[0].compare) {
    return Base.binary.apply(null, [context, op].concat([c[0], c[1]]));
  }

  return {
    type: 'LogicalExpression',
    operator: '&&',
    left: chainedComp(c[0].compare, c[0].operation, context),
    right:
      Base.binary.apply(null, [context, op].concat([
        c[0].compare[1],
        c[1]
      ]))
  }
}

Compare.prototype.compile = function (context) {
  var ret;

  var compare = table[this.compare[0]];

  if (compare) {
    return { type: 'Identifier', name: compare, __core: true };
  }

  // chained comparisons
  if (this.compare[0].compare) {
    return chainedComp(this.compare, this.operation, context);
  }

  // FIXME this is hacky
  ret = types(this.compare[0], this.compare[1], this.operation, context);
  if (ret) return ret;
  ret = types(this.compare[1], this.compare[0], this.operation, context);
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
