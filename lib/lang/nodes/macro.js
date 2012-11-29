var Base = require('./base');
var util = require('util');

var esprima = require('esprima');
var escodegen = require('escodegen');

var vm = require('vm');

function runMacro(name, args, context) {
  var self = {};
  var ast = Base._macros[name];

  args = esprima.parse(Base.obj2str(args));

  ast = {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: ast,
      arguments: args.body[0].expression.elements
    }
  }

  var code = escodegen.generate(ast);
  var result;
  try {
    result = vm.runInNewContext(code, context);
  } catch (e) {
    console.error(code);
    throw e;
  }

  return result;
}

function Macro(def, name, args) {
  this.name = name;
  this.args = args;

  this.def = def;

  return this;
}

Macro.prototype.compile = function (context) {
  var name = this.name.name;
  if (this.def) {
    Base._macros[name] = Base.compileValue(this.args, context);
    return [];
  }
  return runMacro(name, Base.compileValue(this.args, context), context);
};

module.exports = Macro;
