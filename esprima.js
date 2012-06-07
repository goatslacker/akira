var util = require('util');
var esprima = require('esprima');
var escodegen = require('escodegen');
var ast = esprima.parse('(function () { var $$obj = foo; Object.keys($$obj).forEach(function (key) { base[key] = $$obj[key]; }); }())');
//console.log(escodegen.generate(ast));
util.puts(util.inspect(ast, false, 35));
