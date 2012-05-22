var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('print(2);\nfunction head(list) { return list[0] }');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 14));
