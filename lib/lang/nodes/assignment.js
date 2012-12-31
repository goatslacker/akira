var Base = require('./base');
var util = require('util');
var destructure = require('destructure');

var $$ref = { type: 'Identifier', name: '_$ref' };

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
      var name = { type: 'Identifier', name: '_$v' };

      var body = [{
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: [Base.assignment(context, name, null)]
      }, value];

      assignLastStmt(name, body, context);

      return body.concat(destructure(
        name,
        Base.compileValue(this.id, context),
        0,
        function (name) {
          throw new ReferenceError(symbol + ' is already defined at ' +
            context.$$$filename + ':' + this.line);
        }.bind(this),
        context
      ));
    case 'Map':
      var name = { type: 'Identifier', name: '_$m' };

      var body = [{
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: [Base.assignment(context, name, null)]
      }, value];

      assignLastStmt(name, body, context);

      return body.concat(destructure(
        name,
        Base.compileValue(this.id, context),
        0,
        function (name) {
          throw new ReferenceError(symbol + ' is already defined at ' +
            context.$$$filename + ':' + this.line);
        }.bind(this),
        context
      ));
    default:
      Assignment.immutable(name, value, context, this);

      var body = [value];
      assignLastStmt(this.id, body, context);

      return body;
  }
};

module.exports = Assignment;
