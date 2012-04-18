var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('(function () { return print("hi") }())');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 10));
