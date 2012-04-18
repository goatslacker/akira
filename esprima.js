var util = require('util');
var esprima = require('esprima');
var ast = esprima.parse('foo(1)');
util.puts(util.inspect(ast.body[0], false, 10));
