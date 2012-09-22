var Base = require('./base');

var esprima = require('esprima');
var escodegen = require('escodegen');

var vm = require('vm');

function runMacro(name, args, context) {
  var self = {};
  var ast = Base._macros[name];

  args = esprima.parse(JSON.stringify(args));

  ast = {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: ast,
      arguments: args.body[0].expression.elements
    }
  }

  var code = escodegen.generate(ast);
  return vm.runInNewContext(code, context);
}

function Macro(def, name, args) {
  this.name = name;
  this.args = args;

  this.def = def;

  return this;
}

Macro.prototype.compile = function (context) {
  if (this.def) {
    Base._macros[this.name] = Base.compileValue(this.args, context);
    return [];
  }
  return runMacro(this.name, Base.compileValue(this.args, context), context);
};

module.exports = Macro;
