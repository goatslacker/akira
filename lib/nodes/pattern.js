var Base = require('./base');
var util = require('util');

var Pattern = function (iden, patterns) {
  this.iden = iden.args.slice(0).pop();
  this.patterns = patterns.args.slice(0);
  return this;
};

Pattern.prototype = Base.extend({
  compile: function (context) {
    var iden = Base.compileValue(this.iden, context);
    var self = this;
    return {
      type: 'SwitchStatement',
      discriminant: { type: 'Literal', value: false },
//      Base.compileValue(this.iden, context),
      cases: this.patterns.map(function (pattern) {
        var test = Base.compileValue(pattern[0], context);

        switch (test.type) {
          case 'Identifier':
            test = null;
            break;
          case 'Literal':
            test = {
              type: 'UnaryExpression',
              operator: '!',
              argument: {
                type: 'BinaryExpression',
                operator: '===',
                left: iden,
                right: test
              }
            };
            break;
        }

        return {
          type: 'SwitchCase',
          test: test,
          consequent: [{
            type: 'ReturnStatement',
            argument: Base.compileValue(pattern[1], context)
          }]
        };
      })
    };
  }
});

module.exports = Pattern;
