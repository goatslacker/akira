(function () {
function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
var fs, path, util, vm, escodegen, me, lexer, Parser, parser, tokenize, parse, ast, wrap, compile, file, run, output, analyze, memory;
fs = require('fs');
path = require('path');
util = require('util');
vm = require('vm');
escodegen = require('escodegen');
me = require('./package.json');
lexer = require('./lib/lexer');
Parser = require('./lib/parser');
parser = Parser.parser;
(function () {
    var $$obj = require('./lib/nodes');
    Object.keys($$obj).forEach(function (key) {
        parser.yy[key] = $$obj[key];
    });
}());
tokenize = function tokenize(code) {
    return lexer.tokenize(code);
};
parse = function parse(tokens) {
    return parser.parse(tokens);
};
ast = function ast(parsed) {
    var self, body, ast, program;
    self = Object.create({});
    body = parsed.compile(self);
    ast = parsed.getUtils(self).concat(parsed.addVars(self)).concat(body);
    return program = {
        type: 'Program',
        body: ast
    };
};
wrap = function wrap(program) {
    return [
        '(function () {',
        escodegen.generate(program),
        '}.call(typeof module !== "undefined" ? module.exports : this))'
    ];
};
compile = function compile(code) {
    return wrap(ast(parse(tokenize(code))));
};
file = function file(filepath) {
    return fs.readFileSync(path.join(process.env.PWD, filepath)).toString();
};
run = function run(code) {
    var result;
    try {
        result = vm.runInNewContext(code.join(''), {
            console: console
        });
    } catch (err) {
        util.error(err.stack);
        util.debug(code);
    }
    return result;
};
output = function output(list) {
    return map(function (x) {
        return util.puts(x);
    }, list);
};
analyze = function analyze(body) {
    return util.puts(util.inspect(body, false, 50));
};
memory = function memory(item, action) {
    switch (false) {
    case !(action === 'compile'):
        return output(compile(file(item)));
    case !(action === 'test'):
        return run(compile(file('test/tests.mem')));
    case !(action === 'run'):
        return run(compile(file(item)));
    case !(action === 'tokens'):
        return analyze(tokenize(file(item)));
    case !(action === 'ast'):
        return analyze(ast(parse(tokenize(file(item)))));
    case !(action === 'version'):
        return util.puts('memory '.concat(me.version));
    }
};
this.memory = memory;
}.call(typeof module !== "undefined" ? module.exports : this))
