var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('foo.bar');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 14));
