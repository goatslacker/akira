var Base = require('./base');
var fs = require('fs');
var lexer = require('../lexer');
var parser = require('../parser').parser;

var Import = function (i) {
  this.i = i;
  return this;
};

Import.prototype = Base.extend({
  run: function (context) {
    parser.parse(lexer.tokenize(fs.readFileSync(this.i).toString())).run(context);
    return context;
  }
});

module.exports = Import;
