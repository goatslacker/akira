var Base = require('./base');

var Operation = function (a, op, b) {
  this.operators = [a, b];
  this.operation = op;
};

Operation.prototype.compile = function (context) {
  if (this.operation === '++') {
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
  }

  if (this.operation === '+:') {
    return {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: Base.compileValue(this.operators[1], context),
        property: { type: 'Identifier', name: 'unshift' }
      },
      arguments: [Base.compileValue(this.operators[0], context)]
    };
  }

  if (this.operation === '!!') {
    return {
      type: 'MemberExpression',
      computed: true,
      object: Base.compileValue(this.operators[0], context),
      property: Base.binary(context, '+', this.operators[1], '1')
    };
  }

  return Base.binary.apply(null, [context, this.operation].concat(this.operators));
};

module.exports = Operation;
