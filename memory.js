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

function compile(file) {
  var code = fs.readFileSync(path.join(process.env.PWD, file)).toString();
  var tokens = lexer.tokenize(code);
  var parsed = parser.parse(tokens);
  var run = parsed.compile([context]);
  var ast = { type: 'Program', body: parsed.getUtils().concat(run) };
//    util.puts(util.inspect(ast, false, 30));
  var compiled = '(function () {\n' + escodegen.generate(ast) + '\n}.call(typeof module !== "undefined" ? module.exports : this))';
//  util.puts(compiled);
  return compiled
}

function run(code) {
  var new_context = Object.create(context);
  new_context.console = console;
  try {
    vm.runInNewContext(code, new_context);
  } catch (e) {
    console.error(e.stack);
    console.log(compiled);
  }
}

/** main **/
function memory(args) {
  var action = args[0];
  switch (action) {
    case 'test':
      return run(compile('test/tests.mem'));
    case 'compile':
      return console.log(compile(args[1]));
  }
}

module.exports = memory;
