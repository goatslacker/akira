var Base = require('./base');
var Identifier = require('./identifier');

var Operation = function (a, op, b) {
  this.operators = [a, b];
  this.operation = op;
};

function concat(context, a, b) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: Base.compileValue(a, context),
      property: { type: 'Identifier', name: 'concat' }
    },
    arguments: [Base.compileValue(b, context)]
  };
}

Operation.prototype.compile = function (context) {
  switch (this.operation) {
  case '++':
    return concat(context, this.operators[0], this.operators[1]);
  case '+:':
    return {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'ArrayExpression',
          elements: [Base.compileValue(this.operators[0], context)]
        },
        property: { type: 'Identifier', name: 'concat' }
      },
      arguments: [Base.compileValue(this.operators[1], context)]
    };
  case '!!':
    return {
      type: 'MemberExpression',
      computed: true,
      object: Base.compileValue(this.operators[0], context),
      property: Base.compileValue(this.operators[1], context)
    };
  case '*':
    if (this.operators[0].literal && typeof this.operators[0].literal === 'string') {
      return {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: {
            type: 'NewExpression',
            callee: { type: 'Identifier', name: 'Array' },
            arguments: [Base.binary(context, '+', '1', Base.compileValue(this.operators[1], context))]
          },
          property: { type: 'Identifier', name: 'join' }
        },
        arguments: [Base.compileValue(this.operators[0], context)]
      };
    }
    break;
  case '=>':
    var iden = new Identifier('partial');
    return {
      type: 'CallExpression',
      callee: iden.compile(context),
      arguments: [
        Base.compileValue(this.operators[0], context),
        Base.compileValue(this.operators[1], context)
      ]
    };
  case '<+':
    var iden = new Identifier('merge');
    return {
      type: 'CallExpression',
      callee: iden.compile(context),
      arguments: [
        Base.compileValue(this.operators[0], context),
        Base.compileValue(this.operators[1], context)
      ]
    };
  }

  return Base.binary.apply(null, [context, this.operation].concat(this.operators));
};

module.exports = Operation;
