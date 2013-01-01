var Base = require('./base');
var util = require('util');
var implicitReturn = require('implicitReturn');
var FunctionExpression = require('ast/FunctionExpression');
var CallExpression = require('ast/CallExpression');
var ast = require('ast');

// TODO DRY this
function expr(stmt) {
  var expr = [{
    type: 'ExpressionStatement',
    expression: stmt
  }];
  if (Array.isArray(stmt)) {
    expr = stmt;
  }
  return expr;
}

function Cond(patterns, def) {
  this.patterns = patterns.args.slice(0);
  if (def) {
    this.patterns = this.patterns.concat([def.slice(0)]);
  }
  return this;
}

Cond.prototype.compile = function (context) {
  var body = [{
    type: 'SwitchStatement',
    __cond: true,
    discriminant: { type: 'Literal', value: false },
    cases: this.patterns.map(function (pattern) {
      var test;
      if (pattern[0] === 'else') {
        test = null;
      } else {
        test = {
          type: 'UnaryExpression',
          operator: '!',
          argument: ast(pattern[0], context)
        };
      }

      var body = ast(pattern[1], context);

      return {
        type: 'SwitchCase',
        test: test,
        consequent: expr(body)
      };
    })
  }];

  implicitReturn(body);

  return CallExpression(FunctionExpression(
    null,
    [],
    body
  ), []);
};

module.exports = Cond;
