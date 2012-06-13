(function () {
var raise = function raise(msg, error) {
    error = error || Error;
    throw error(msg);
};
var map = function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
};
var joinLines = function joinLines(list) {
    return list.join('\n');
};
var fs, path, util, vm, escodegen, nodewatch, me, lexer, Parser, parser, tokenize, parse, ast, wrap, compile, walk, file, files, run, output, analyze, write, watch, displayHelp, memory;
fs = require('fs');
path = require('path');
util = require('util');
vm = require('vm');
escodegen = require('escodegen');
nodewatch = require('nodewatch');
me = require('../package.json');
lexer = require('./lexer');
Parser = require('./parser');
parser = Parser.parser;
(function () {
    var $$obj = require('./nodes');
    Object.keys($$obj).forEach(function (key) {
        parser[key] = $$obj[key];
    });
}());
tokenize = function (code) {
    return lexer.tokenize(code);
};
parse = function (tokens) {
    return parser.parse(tokens);
};
ast = function (parsed) {
    var self, body, ast, program;
    self = Object.create({});
    body = parsed.compile(self);
    ast = parsed.getUtils(self).concat(parsed.addVars(self)).concat(body);
    return program = {
        type: 'Program',
        body: ast
    };
};
wrap = function (program) {
    return [
        '(function () {',
        escodegen.generate(program),
        '}.call(typeof module !== "undefined" ? module.exports : this))'
    ];
};
compile = function (code) {
    return wrap(ast(parse(tokenize(code))));
};
walk = function (tree, cb) {
    var stat;
    try {
        stat = fs.statSync(tree);
    } catch (err) {
        raise(err);
    }
    if (stat.isDirectory()) {
        return map(function (v) {
            return walk(path.join(tree, v), cb);
        }, fs.readdirSync(tree));
    } else {
        if (tree.indexOf('.mem') >= 0) {
            return cb(file(tree), tree);
        } else {
            return null;
        }
    }
};
file = function (filepath) {
    return fs.readFileSync(path.join(process.env.PWD, filepath)).toString();
};
files = function (dirname, cb) {
    var stat;
    stat = fs.statSync(dirname);
    if (stat.isDirectory()) {
        return walk(dirname, cb);
    } else {
        return cb(file(dirname), dirname);
    }
};
run = function (code) {
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
output = function (list) {
    return map(function (x) {
        return util.puts(x);
    }, list);
};
analyze = function (body) {
    return util.puts(util.inspect(body, false, 50));
};
write = function (code, item) {
    var filepath;
    filepath = path.join(process.env.PWD, item.replace('src', 'lib').replace('.mem', '.js'));
    return fs.writeFileSync(filepath, joinLines(code));
};
watch = function (filename) {
    return nodewatch.add(filename).onChange(function () {
        return write(compile(file(filename)), filename);
    });
};
displayHelp = function () {
    util.puts('               memory');
    util.puts('');
    util.puts('ast [file]     - output the Mozilla Parse API for that file');
    util.puts('compile [file] - compile to JavaScript');
    util.puts('code [file]    - compile to JS and output');
    util.puts('run [file]     - compile and interpret said file');
    util.puts('test           - run memory unit tests');
    util.puts('tokens [file]  - output the lexer tokens for that file');
    util.puts('version        - memory version');
    util.puts('watch [file]   - watch a file for changes and compile on change');
    return util.puts('');
};
memory = function (item, action) {
    switch (false) {
    case !(action === 'compile'):
        return files(item, function (code, name) {
            return write(compile(code), name);
        });
    case !(action === 'code'):
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
    case !(action === 'watch'):
        return watch(item);
    default:
        return displayHelp();
    }
};
this.memory = memory;
}.call(typeof module !== "undefined" ? module.exports : this))