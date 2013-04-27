var CallExpression = require('ast/CallExpression');
var ExpressionStatement = require('ast/ExpressionStatement');
var FunctionExpression = require('ast/FunctionExpression');
var Literal = require('ast/Literal');
var ast = require('ast');
var implicitReturn = require('implicitReturn');

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
    discriminant: Literal(false),
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
        consequent: ExpressionStatement(body)
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
