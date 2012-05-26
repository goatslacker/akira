var Base = require('./base');
var util = require('util');

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

  var ret = Base.compileValue(this.val, context);

  if (ret.type === 'IfStatement') {
    var ret1 = ret.consequent.body[ret.consequent.body.length - 1];
    var ret2 = ret.alternate.body[ret.alternate.body.length - 1];

    ret1 = Base.binary(context, '=', this.id, ret1.type === 'ExpressionStatement' ? ret1.expression : ret1);
    ret1.type = 'AssignmentExpression';
    ret2 = Base.binary(context, '=', this.id, ret2.type === 'ExpressionStatement' ? ret2.expression : ret2);
    ret2.type = 'AssignmentExpression';

    ret.consequent.body[ret.consequent.body.length - 1] = { type: 'ExpressionStatement', expression: ret1 };
    ret.alternate.body[ret.alternate.body.length - 1] = { type: 'ExpressionStatement', expression: ret2 };

    return ret;
  }

  var ast = Base.binary(context, '=', this.id, this.val);
  ast.type = 'AssignmentExpression';
  return ast;
};

module.exports = Assignment;
