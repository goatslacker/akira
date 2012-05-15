var Base = require('./base');
var fs = require('fs');
var lexer = require('../lexer');
var parser = require('../parser').parser;
var escodegen = require('escodegen');
var util = require('util');

var Import = function (i) {
  this.i = i;
  return this;
};

Import.prototype = Base.extend({
  compile: function (context) {
    var ast = parser.parse(lexer.tokenize(fs.readFileSync(this.i).toString())).compile(context);
    ast = { type: 'Program', body: ast };
    console.log(util.inspect(ast, false, 10));
    return escodegen.generate(ast);
  },
  run: function (context) {
    parser.parse(lexer.tokenize(fs.readFileSync(this.i).toString())).run(context);
    return context;
  }
});

module.exports = Import;
