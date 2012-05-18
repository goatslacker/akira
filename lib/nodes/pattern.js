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
