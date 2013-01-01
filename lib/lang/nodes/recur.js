var Identifier = require('ast/Identifier');
var Literal = require('ast/Literal');
var ast = require('ast');

function Recur(params) {
  this.params = params.args;
}

Recur.prototype.compile = function (context) {
  var name = '_$r';
  var i = 0;

  return [{
    __recur: true,
    type: 'BlockStatement',
    body: this.params.map(function (param) {
      return {
        type: 'VariableDeclaration',
        declarations: [{
          type: 'VariableDeclarator',
          id: Identifier(name + (i++)),
          init: ast(param, context)
        }],
        kind: 'var'
      };
    })
  }, Literal(null)];
};

module.exports = Recur;
