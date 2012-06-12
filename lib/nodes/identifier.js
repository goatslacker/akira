var Base = require('./base');
var esprima = require('esprima');

var JSReserved = ['break', 'case', 'continue', 'debugger', 'default', 'delete', 'do', 'finally', 'for', 'function', 'in', 'instanceof', 'new', 'null', 'return', 'switch', 'this', 'throw', 'typeof', 'var', 'void', 'while', 'with'];

var F = require('../utils')

function include(name) {
  var ast = esprima.parse('var ' + name + ' = ' + F.modules[name].toString());
  return Base.extras(name, ast.body[0]);
}

var Identifier = function (name, no_utils) {
  if (JSReserved.indexOf(name) !== -1) {
    name = '$' + name;
  }
  this.name = name.replace(/-+([a-zA-Z0-9$_])/g, function (i) { return i[1].toUpperCase() });
  this.utils = !no_utils;
  return this;
};

Identifier.prototype.compile = function (context) {
  if (this.utils && F.modules.hasOwnProperty(this.name)) {
    if (F.dependencies[this.name]) {
      F.dependencies[this.name].forEach(include);
    }

    include(this.name);
  }

  return { type: 'Identifier', name: this.name };
};

module.exports = Identifier;
