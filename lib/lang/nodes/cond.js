var Base = require('./base');
var util = require('util');

// TODO DRY this
function block(stmt) {
  var expr = [{
    type: 'ExpressionStatement',
    expression: stmt
  }];
  if (Array.isArray(stmt)) {
    expr = stmt;
  } else if (stmt.type === 'IfStatement') {
    expr = [stmt];
  }
  return {
    type: 'BlockStatement',
    body: expr
  };
}

function Cond(patterns, def) {
  this.patterns = patterns.args.slice(0);
  if (def) {
    this.patterns = this.patterns.concat([def.slice(0)]);
  }
  return this;
}

Cond.prototype.compile = function (context) {
  var self = this;
  return {
    type: 'SwitchStatement',
    discriminant: { type: 'Literal', value: false },
    cases: this.patterns.map(function (pattern) {
      var test;
      if (pattern[0] === 'else') {
        test = null;
      } else {
        test = {
          type: 'UnaryExpression',
          operator: '!',
          argument: Base.compileValue(pattern[0], context)
        };
      }

      var body = Base.compileValue(pattern[1], context);

      return {
        type: 'SwitchCase',
        test: test,
        consequent: [block(body)]
      };
    })
  };
};

module.exports = Cond;
