var Base = require('./base');
var ast = require('ast');
var Store = require('Store');

function Macro(name, args) {
  this.name = name;
  this.args = args;

  return this;
}

Macro.prototype.compile = function (context) {
  var name = this.name.name;
  Store.macros[name] = ast(this.args, context);
  return [];
};

module.exports = Macro;
