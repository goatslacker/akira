var Base = require('./base');
var esprima = require('esprima');

var JSReserved = ['break', 'case', 'continue', 'debugger', 'default', 'delete', 'do', 'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'typeof', 'var', 'void', 'while', 'with'];

var F = require('../utils');

var Identifier = function (name) {
  if (JSReserved.indexOf(name) !== -1) {
    name = '$' + name;
  }
  this.name = name.replace(/-([a-z])/g, function (i) { return i[1].toUpperCase() });
  return this;
};

Identifier.prototype.compile = function (context) {
  if (F.hasOwnProperty(this.name)) {
    var ast = esprima.parse(F[this.name].toString());
    Base.extras(this.name, ast.body[0]);
  }

  return { type: 'Identifier', name: this.name };
};

module.exports = Identifier;
