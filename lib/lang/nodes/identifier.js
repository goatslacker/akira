var CallExpression = require('ast/CallExpression');
var Identifier = require('ast/Identifier');
var MemberExpression = require('ast/MemberExpression');
var core = require('../../core/core');

var JSReserved = [
  'break', 'case', 'continue', 'debugger', 'default', 'delete',
  'do', 'finally', 'for', 'function', 'in', 'instanceof', 'new',
  'null', 'return', 'switch', 'throw', 'typeof', 'var', 'void',
  'while', 'with'
];

function Iden(name, rest) {
  if (JSReserved.indexOf(name) !== -1) {
    name = '$' + name;
  }
  this.key = name.indexOf('@') === 0;
  this.name = name
    .replace(/-+([a-zA-Z0-9$_])/g, function (i) { return i[1].toUpperCase() })
    .replace('@', '')
    .replace(/\?$/, '$QUOT');

  this.rest = rest;
  return this;
}

Iden.prototype.compile = function (context) {
  if (this.name === '__prototype') {
    return CallExpression(
      MemberExpression(
        Identifier('Object'),
        Identifier('getPrototypeOf')
      ), [MemberExpression(
        { type: 'ThisExpression' },
        Identifier('__proto__')
      )]
    );
  }

  var iden = Identifier(this.name, false, this.rest);

  if (core.hasOwnProperty(this.name) && !this.key) {
    iden.__core = true;
  }

  return iden;
};

module.exports = Iden;
