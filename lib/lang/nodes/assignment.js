var AssignmentExpression = require('ast/AssignmentExpression');
var ExpressionStatement = require('ast/ExpressionStatement')
var Identifier = require('ast/Identifier');
var VariableDeclaration = require('ast/VariableDeclaration');
var ast = require('ast');
var destructure = require('destructure');
var fu = require('fu')
var unwrapExpressionStatement = require('unwrapExpressionStatement')

var TypeSystem = require('TypeSystem')
var Store = require('Store')

var $$ref = Identifier('_$ref');

function Assignment(id, val) {
  this.id = id;
  this.val = val;
  return this;
}

function assignLastStmt(id, body, context) {
  var ret = unwrapExpressionStatement(body[body.length - 1])

  if (ret.type === 'TryStatement') {
    assignLastStmt(id, ret.block.body, context);
    assignLastStmt(id, ret.handlers[0].body.body, context);
  } else if (ret.type === 'IfStatement') {
    assignLastStmt(id, ret.consequent.body, context);
    assignLastStmt(id, ret.alternate.body, context);
  } else {
    var xid = ast(id, context)
    var node = ExpressionStatement(AssignmentExpression(xid, ret))
    node.__type = TypeSystem.infer(ret, context)
    body[body.length - 1] = node
  }
}

function assign(context, left, right, self) {
  Assignment.immutable(left.name, right, context, self);
  return ExpressionStatement(AssignmentExpression(left, right))
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

  if (context.$$$params && context.$$$params.args) {
    var fnArgs = fu.map(function (x) { return x.name}, context.$$$params.args)
    if (fu.elem(symbol, fnArgs)) {
      throw new ReferenceError(symbol + ' is already defined at ' +
        context.$$$filename + ':' + self.line);
    }
  }

  return context[symbol] = value;
};

Assignment.prototype.compile = function (context) {
  var self = this;
  var name = this.id.name;
  var body;
  var value = ast(this.val, context);

  // XXX TypeSystem infer here

  if (this.id.akiraName === 'Access') {
    name = ast(this.id, context);
    return ExpressionStatement(AssignmentExpression(name, value))
  }

  if (this.id.operation === '!!') {
    name = ast(this.id, context);
    return ExpressionStatement(AssignmentExpression(name, value))
  }

  switch (this.id.constructor.name) {
  case 'Vector':
    name = Identifier('_$v');
    context['_$v'] = value;
    body = [value];

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
    name = Identifier('_$m');
    context['_$m'] = value;
    body = [value];

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
