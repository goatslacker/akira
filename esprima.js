var util = require('util');
var esprima = require('esprima');
var ast = esprima.parse('var foo = function foo(n) { return [n]; };');
util.puts(util.inspect(ast.body[0], false, 10));
