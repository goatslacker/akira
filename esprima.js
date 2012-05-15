var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('(function () { this.fact = fact; function fact(n) { }}.call(this))');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 14));
