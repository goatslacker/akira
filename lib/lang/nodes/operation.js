var Base = require('./base');
var Identifier = require('./identifier');

function Operation(a, op, b) {
  this.operators = [a, b];
  this.operation = op;
}

function doConcat(obj, arg) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: obj,
      property: { type: 'Identifier', name: 'concat' }
    },
    arguments: arg
  }
}

function concat(context, a, b) {
  // optimize concatenation
  // if the next operation is also a concat
  // eval it and pull the object and the arguments
  // and concat those arguments with the current arguments
  // so a concat looks like this: [1].concat([2], [3], [4])
  // instead of [1].concat([2]).concat([3]).concat([4])
  var f = Base.compileValue(a, context);
  if (a.operation && a.operation === '++') {
    return doConcat(
      f.callee.object,
      f.arguments.concat([Base.compileValue(b, context)])
    );
  }

  return doConcat(
    f,
    [Base.compileValue(b, context)]
  );
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
    if (this.operators[0].constructor.name === 'Literal' &&
        typeof this.operators[0].literal === 'string') {
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
  }

  return Base.binary.apply(null, [context, this.operation].concat(this.operators));
};

module.exports = Operation;
