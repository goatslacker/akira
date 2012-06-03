var Base = require('./base');

var Operation = function (a, op, b) {
  this.operators = [a, b];
  this.operation = op;
};

Operation.prototype.compile = function (context) {
  switch (this.operation) {
  case '++':
    return {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: Base.compileValue(this.operators[0], context),
        property: { type: 'Identifier', name: 'concat' }
      },
      arguments: [Base.compileValue(this.operators[1], context)]
    };
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
  }

  return Base.binary.apply(null, [context, this.operation].concat(this.operators));
};

module.exports = Operation;
