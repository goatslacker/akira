var fs = require('fs');
var path = require('path');
var util = require('util');
var vm = require('vm');
var escodegen = require('escodegen');

var lexer = require('./lib/lexer');
var parser = require('./lib/parser').parser;
var context = {};

parser.lexer = {
  lex: function () {
    var tag, _ref2;
    _ref2 = this.tokens[this.pos++] || [''];
    tag = _ref2[0];
    this.yytext = _ref2[1];
    this.yylineno = _ref2[2] || 0;
    return tag;
  },
  setInput: function (tokens) {
    this.tokens = tokens;
    return this.pos = 0;
  },
  upcomingInput: function () {
    return "";
  }
};

parser.yy = require('./lib/nodes');

function compile(code) {
  var self = Object.create(context);
  var tokens = lexer.tokenize(code);
  var parsed = parser.parse(tokens);
  var run = parsed.compile(self);
  var ast = { type: 'Program', body: parsed.getUtils(self).concat(parsed.addVars(self).concat(run)) };
//  util.debug(util.inspect(ast, false, 30));
  var compiled = '(function () {\n' + escodegen.generate(ast) + '\n}.call(typeof module !== "undefined" ? module.exports : this))';
  return compiled
}

function file(filepath) {
  var code = fs.readFileSync(path.join(process.env.PWD, filepath)).toString();
  return compile(code);
}

function run(code) {
  var new_context = Object.create(context);
  var result = null;
  new_context.console = console;
  try {
    result = vm.runInNewContext(code, new_context);
  } catch (e) {
    util.error(e.stack);
    util.puts(code);
  }
  return result;
}

/** main **/
function memory(args) {
  var action = args[0];
  switch (action) {
    case 'test':
      return run(file('test/tests.mem'));
    case 'compile':
      return process.stdout.write(file(args[1]) + '\n');
    case 'run':
      return run(file(args[1]));
  }
}

module.exports = memory;
