var Base = require('./base');

function Macro(name, args) {
  this.name = name;
  this.args = args;

  return this;
}

Macro.prototype.compile = function (context) {
  var name = this.name.name;
  Base._macros[name] = Base.compileValue(this.args, context);
  return [];
};

module.exports = Macro;
