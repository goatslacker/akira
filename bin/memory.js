var path = require('path');
var context = require('../lib/runtime');
var escodegen = require('escodegen');
var vm = require('vm');
var memory = require('../memory');

if (process.argv[2] === 'test') {
  process.argv[2] = 'test/tests.mem';
}

var functions = memory(path.join(__dirname, '..', 'lib', 'functions.mem'));
vm.runInNewContext(functions, context);

var code = memory(path.join(process.env.PWD, process.argv[2]));

try {
  vm.runInNewContext(code, context);
} catch (e) {
  console.error(e.stack);
  console.log(code);
}
