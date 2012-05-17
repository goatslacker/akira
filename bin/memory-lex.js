var fs = require('fs');
var util = require('util');
var path = require('path');
var vm = require('vm');

var lexer = require('../lib/lexer');
var parser = require('../lib/parser').parser;
var escodegen = require('escodegen');

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

parser.yy = require('../lib/nodes');

var context = require('../lib/runtime');

// load lib
var functions = parser.parse(lexer.tokenize(fs.readFileSync('./lib/functions.mem').toString())).compile([context]);
functions = { type: 'Program', body: functions };
vm.runInNewContext(escodegen.generate(functions), context);

var code = (function () {
  var file = path.join(__dirname, '..', 'src', 'lexer.mem'),
      data = fs.readFileSync(file, 'utf8');

  return data;
}());

var tokens = lexer.tokenize(code);
var parsed = parser.parse(tokens);
var run = parsed.compile([context]);
run = { type: 'Program', body: run };

//util.puts(util.inspect(run, false, 15));
var compiled = escodegen.generate(run);

context.code = code;
context.console = console;

try {
  vm.runInNewContext(compiled + '\nconsole.log(Lexer.tokenize(code))', context);
} catch (e) {
  console.error(e.message);
  console.error(e.stack);
  console.log(compiled);
}
