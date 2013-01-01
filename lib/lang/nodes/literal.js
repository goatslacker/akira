var BinaryExpression = require('ast/BinaryExpression');
var Identifier = require('ast/Identifier');
var Literal = require('ast/Literal');

function LiteralNode(lit) {
  this.literal = lit;
  return this;
}

function literalize(x) {
  if (typeof x !== 'string') {
    return x;
  }

  var rx = /{{(.*)}}/;

  if (rx.test(x)) {
    return Identifier('(' + rx.exec(x)[1] + ')');
  }

  return Literal(x);
}

function concatStr(l, r) {
  return BinaryExpression('+', literalize(l), literalize(r));
}

LiteralNode.prototype.compile = function (context) {
  var interpol;
  switch (typeof this.literal) {
  case 'string':
    interpol = this.literal.split(/({{[A-Za-z0-9$ \+\-\*\/_\.\[\]]+}})/g);
    if (interpol.length > 1) {
      return interpol.reduce(function (a, b) {
        return concatStr(a, b);
      });
    }
    break;
  case 'number':
    if (this.literal < 0) {
      return {
        type: 'UnaryExpression',
        operator: '-',
        argument: Literal(Math.abs(this.literal))
      };
    }
    break;
  }

  return Literal(this.literal);
};

module.exports = LiteralNode;
