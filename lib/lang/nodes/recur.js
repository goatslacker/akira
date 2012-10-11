var Base = require('./base');
var util = require('util');

function Recur(params) {
  this.params = params.args;
}

Recur.prototype.compile = function (context) {
  var name = '$$recur';
  var i = 0;

  return [{
    __recur: true,
    type: 'BlockStatement',
    body: this.params.map(function (param) {
      return {
        type: 'VariableDeclaration',
        declarations: [{
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: name + (i++) },
          init: Base.compileValue(param, context)
        }],
        kind: 'var'
      };
    })
  }, {
    type: 'Literal', value: null
  }];
};

module.exports = Recur;
