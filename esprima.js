var esprima = require('esprima');
var ast = esprima.parse('if (n == 1) { n } else { n }');
console.log(ast.body[0]);
