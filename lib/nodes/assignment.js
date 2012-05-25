var Base = require('./base');

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

  var ast = Base.binary(context, '=', this.id, this.val);
  ast.type = 'AssignmentExpression';
  return ast;
};

module.exports = Assignment;
