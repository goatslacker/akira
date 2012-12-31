var Base = require('./base');

var JSReserved = ['break', 'case', 'continue', 'debugger', 'default', 'delete', 'do', 'finally', 'for', 'function', 'in', 'instanceof', 'new', 'null', 'return', 'switch', 'throw', 'typeof', 'var', 'void', 'while', 'with'];

var core = require('../../core/core');
var CallExpression = require('ast/CallExpression');

function Identifier(name, rest) {
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

Identifier.prototype.compile = function (context) {
  if (this.name === '__prototype') {
    return CallExpression({
      type: 'MemberExpression',
      computed: false,
      object: { type: 'Identifier', name: 'Object' },
      property: { type: 'Identifier', name: 'getPrototypeOf' }
    }, [{
      type: 'MemberExpression',
      computed: false,
      object: { type: 'ThisExpression' },
      property: { type: 'Identifier', name: '__proto__' }
    }]);
  }

  var iden = { type: 'Identifier', name: this.name, __rest: this.rest };

  if (core.hasOwnProperty(this.name) && !this.key) {
    iden.__core = true;
  }

  return iden;
};

module.exports = Identifier;
