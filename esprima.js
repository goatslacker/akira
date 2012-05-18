var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('function f(n) { switch (false) { case !(n === 2): return 2; } }');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 14));
