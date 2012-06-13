var Base = require('./base');
var util = require('util');

var Pattern = function (iden, patterns, def) {
  this.iden = iden.args.slice(0).pop();
  this.patterns = patterns.args.slice(0);
  if (def) {
    this.patterns = this.patterns.concat(def.args.slice(0));
  }
  return this;
};

Pattern.prototype.compile = function (context) {
  var iden = Base.compileValue(this.iden, context);
  return {
    type: 'SwitchStatement',
    discriminant: { type: 'Literal', value: false },
    cases: this.patterns.map(function (pattern) {
      var test = Base.compileValue(pattern[0], context);
      switch (test.type) {
      case 'Identifier':
        test = null;
        break;
      case 'CallExpression':
        test = {
          type: 'UnaryExpression',
          operator: '!',
          argument: test
        };
        break;
      case 'UnaryExpression':
      case 'BinaryExpression':
        test = {
          type: 'UnaryExpression',
          operator: '!',
          argument: test
        };
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

      var body = [Base.compileValue(pattern[1], context)];
      if (Array.isArray(body[0])) {
        body = body[0];
      }
      Base.implicitReturn(body);

      return {
        type: 'SwitchCase',
        test: test,
        consequent: body
      };
    })
  };
};

module.exports = Pattern;
