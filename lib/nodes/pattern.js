var Base = require('./base');
var util = require('util');

var Pattern = function (iden, patterns) {
  this.iden = iden.args.slice(0).pop();
  this.patterns = patterns.args.slice(0);
  return this;
};

Pattern.prototype = Base.extend({
  compile: function (context) {
    return {
      type: 'SwitchStatement',
      discriminant: Base.compileValue(this.iden, context),
      cases: this.patterns.map(function (pattern) {
        var test = Base.compileValue(pattern[0], context);
        if (test.type === 'Identifier') {
          test = null;
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
