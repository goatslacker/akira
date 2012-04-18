var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('(function fact(n) { if (n == 1) { return n; } else { return prod(fact(n - 1)); } }())');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 10));
