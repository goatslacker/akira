var esprima = require('esprima');
var ast = esprima.parse('var foo = 2');
console.log(ast.body[0].declarations);
