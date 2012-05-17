var Base = require('./base');
var util = require('util');

var Pattern = function (patterns) {
//  this.name = name;
  this.patterns = patterns.args;
  return this;
};

Pattern.prototype = Base.extend({
  compile: function (context) {
    return {
      type: 'SwitchStatement',
      discriminant: { type: 'Identifier', name: 'a' },
      cases: this.patterns.map(function (pattern) {
        return {
          type: 'SwitchCase',
          test: Base.compileValue(pattern[0], context),
          consequent: [{
            type: 'ReturnStatement',
            argument: Base.compileValue(pattern[1], context)
//            {
//              type: 'CallExpression',
//              callee: {
//                type: 'FunctionExpression',
//                id: null,
//                params: [{ type: 'Identifier', name: 'a' }],
//                body: {
//                  type: 'BlockStatement',
//                  body: [{ type: 'ExpressionStatement', expression: Base.compileValue(pattern[1], context) }]
//                }
//              },
//              arguments: [{ type: 'Identifier', name: 'a' }]
//            }
          }]
        };
      })
    };
  }
});

module.exports = Pattern;
