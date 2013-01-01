var AssignmentExpression = require('ast/AssignmentExpression');
var VariableDeclaration = require('ast/VariableDeclaration');
var ast = require('ast');
var destructure = require('destructure');

var $$ref = { type: 'Identifier', name: '_$ref' };

function Assignment(id, val) {
  this.id = id;
  this.val = val;
  return this;
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
    body[body.length - 1] = {
      type: 'ExpressionStatement',
      expression: AssignmentExpression(
        ast(id, context),
        ast(ret, context)
      )
    };
  }
}

function assign(context, left, right, self) {
  Assignment.immutable(left.name, right, context, self);

  return {
    type: 'ExpressionStatement',
    expression: AssignmentExpression(left, right)
  };
}

function destructor(context, value, obj, fn) {
  var declarations = [VariableDeclaration([$$ref])];

  var body = [value];

  assignLastStmt($$ref, body, context);

  return declarations.concat(body.concat(obj.map(fn)));
}

Assignment.immutable = function (symbol, value, context, self) {
  if (context.hasOwnProperty(symbol)) {
    throw new ReferenceError(symbol + ' is already defined at ' +
      context.$$$filename + ':' + self.line);
  }

  return context[symbol] = value;
};

Assignment.prototype.compile = function (context) {
  var self = this;
  var name = this.id.name;
  var body;
  var value = ast(this.val, context);

  switch (this.id.constructor.name) {
  case 'Access':
    name = ast(this.id, context);
    return {
      type: 'ExpressionStatement',
      expression: AssignmentExpression(name, value)
    };
  case 'Vector':
    name = { type: 'Identifier', name: '_$v' };
    body = [VariableDeclaration([name]), value];

    assignLastStmt(name, body, context);

    return body.concat(destructure(
      name,
      ast(this.id, context),
      0,
      function (name) {
        throw new ReferenceError(name + ' is already defined at ' +
          context.$$$filename + ':' + this.line);
      }.bind(this),
      context
    ));
  case 'Map':
    name = { type: 'Identifier', name: '_$m' };
    body = [VariableDeclaration([name]), value];

    assignLastStmt(name, body, context);

    return body.concat(destructure(
      name,
      ast(this.id, context),
      0,
      function (name) {
        throw new ReferenceError(name + ' is already defined at ' +
          context.$$$filename + ':' + this.line);
      }.bind(this),
      context
    ));
  default:
    Assignment.immutable(name, value, context, this);

    body = [value];
    assignLastStmt(this.id, body, context);

    return body;
  }
};

module.exports = Assignment;
