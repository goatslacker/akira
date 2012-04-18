var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('head([1, 2, 3]);\nfoo()\n;1;\n2;');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 10));
