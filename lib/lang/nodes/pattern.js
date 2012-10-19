var Base = require('./base');
var util = require('util');

function Pattern(iden, patterns, def) {
  this.iden = iden.args.slice(0).shift();
  if (this.iden.constructor.name === 'Assignment') {
    this.iden = this.iden.id.name;
  }
  this.patterns = patterns.args.slice(0);
  if (def) {
    this.patterns = this.patterns.concat(def.args.slice(0));
  }
  return this;
}

Pattern.prototype.compile = function (context) {
  var iden;
  var self = this;
  return {
    type: 'SwitchStatement',
    discriminant: { type: 'Literal', value: false },
    cases: this.patterns.map(function (pattern) {
      var test = Base.compileValue(pattern[0], context);
      iden || (iden = Base.compileValue(self.iden, context));

      switch (test.type) {
      case 'Identifier':
        test = null;
        break;
      case 'FunctionExpression':
        test = Base.inline(pattern[0], iden, context);

        if (!test) {
          test = {
            type: 'UnaryExpression',
            operator: '!',
            argument: {
              type: 'CallExpression',
              callee: test,
              arguments: [iden]
            }
          };
        }
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
      default:
        test = {
          type: 'UnaryExpression',
          operator: '!',
          argument: test
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
