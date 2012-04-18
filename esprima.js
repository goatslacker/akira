var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('var lastEl = function lastEl(a) { return a }');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 10));
