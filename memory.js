var fs = require('fs');
var util = require('util');
var path = require('path');
var escodegen = require('escodegen');

var lexer = require('./lib/lexer');
var parser = require('./lib/parser').parser;
var context = require('./lib/runtime');

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
  var code = fs.readFileSync(file).toString();
  var tokens = lexer.tokenize(code);
  var parsed = parser.parse(tokens);
  var run = parsed.compile([context]);
  run = { type: 'Program', body: run };
  return '(function () {\n' + escodegen.generate(run) + '}.call(this))';
}

module.exports = compile;
