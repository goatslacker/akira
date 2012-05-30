var Base = require('./base');
var util = require('util');

function assignLastStmt(id, body, context) {
  var ret = body[body.length - 1];
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

var Assignment = function (id, val) {
  this.id = id;
  this.val = val;
  return this;
};

Assignment.prototype.compile = function (context) {
  if (context[this.id]) {
    throw new ReferenceError(this.id + ' is already defined');
  }
  context[this.id] = true;

  var body = Base.compileValue(this.val, context);
  assignLastStmt(this.id, [body], context);
  return body;
};

module.exports = Assignment;
