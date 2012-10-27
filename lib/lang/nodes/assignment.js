var Base = require('./base');
var util = require('util');

var $$ref = { type: 'Identifier', name: '$$ref' };

function identifier_check(item, context, self) {
  if (item.type !== 'Identifier') {
    throw new SyntaxError('Expected Identifier instead saw ' + item.type + ' at ' + context.$$$filename + ':' + self.line);
  }

  return item;
}

function assignLastStmt(id, body, context) {
  var ret = body[body.length - 1];
  if (Array.isArray(ret)) {
    ret = ret.pop();
  }
  ret = ret.type === 'ExpressionStatement' ? ret.expression : ret;

  if (ret.type === 'IfStatement') {
    assignLastStmt(id, ret.consequent.body, context);
    assignLastStmt(id, ret.alternate.body, context);
  } else {
    var tmp = Base.binary(context, '=', id, ret);
    tmp.type = 'AssignmentExpression';
    body[body.length - 1] = { type: 'ExpressionStatement', expression: tmp };
  }
}

function assign(context, left, right, self) {
  Assignment.immutable(left.name, right, context, self);

  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: left,
      right: right
    }
  }
}

function destructor(context, value, obj, fn) {
  var declarations = [{
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: [Base.assignment(context, $$ref, null)]
  }];

  var body = [value];

  assignLastStmt($$ref, body, context);

  return declarations.concat(body.concat(obj.map(fn)));
}

function Assignment(id, val) {
  this.id = id;
  this.val = val;
  return this;
}

Assignment.immutable = function (symbol, value, context, self) {
  if (context.hasOwnProperty(symbol)) {
    throw new ReferenceError(symbol + ' is already defined at ' + context.$$$filename + ':' + self.line);
  }

  return context[symbol] = value;
};

Assignment.prototype.compile = function (context) {
  var self = this;
  var name = this.id.name;
  var value = Base.compileValue(this.val, context);

  switch (this.id.constructor.name) {
    case 'Access':
      name = Base.compileValue(this.id, context);
      return {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: name,
          right: value
        }
      };
    case 'Vector':
      return destructor(context, value, this.id.vector[0].args, function (arg, i) {
        var item = identifier_check(Base.compileValue(arg, context), context, self);

        return assign(context, item, {
          type: 'MemberExpression',
          computed: true,
          object: $$ref,
          property: { type: 'Literal', value: i }
        }, self);
      });
    case 'Map':
      return destructor(context, value, this.id.obj.args, function (arg) {
        var item = identifier_check(Base.compileValue(arg.id, context), context, self);

        if (arg.val === null) {
          arg.val = arg.id;
        }

        return assign(context, item, {
          type: 'MemberExpression',
          computed: false,
          object: $$ref,
          property: identifier_check(Base.compileValue(arg.val, context), context, self)
        }, self);
      });
    default:
      Assignment.immutable(name, value, context, this);

      var body = [value];
      assignLastStmt(this.id, body, context);

      return body;
  }
};

module.exports = Assignment;
