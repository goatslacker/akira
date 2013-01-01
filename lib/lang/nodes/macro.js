var Store = require('Store');
var ast = require('ast');

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
