(function () {
var merge = function merge(base, obj) {
    Object.keys(obj).forEach(function (key) {
        base[key] = obj[key];
    });
};
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
var print = function print() {
    var args;
    if (typeof console !== 'undefined') {
        args = Array.prototype.slice.call(arguments, 0);
        console.log.apply(console, args);
    }
    return args;
};
var fs, path, util, vm, escodegen, nodewatch, me, lexer, Parser, parser, tokenize, parse, ast, generate, wrap, compile, noWrap, walk, file, files, run, output, analyze, write, watch, displayHelp, startRepl, prompt, repl, memory;
fs = require('fs');
path = require('path');
util = require('util');
vm = require('vm');
escodegen = require('escodegen');
nodewatch = require('nodewatch');
me = require('../package.json');
lexer = require('./lexer');
Parser = require('./grammar');
parser = Parser.parser;
merge(parser.yy, require('./nodes'));
tokenize = function (code) {
    return lexer.tokenize(code);
};
parse = function (tokens) {
    return parser.parse(tokens);
};
ast = function (parsed, context, evald) {
    var self, body, ast, program;
    self = context || {};
    body = parsed.compile(self);
    ast = parsed.getUtils(self).concat(parsed.addVars(self, evald)).concat(body);
    return program = {
        type: 'Program',
        body: ast
    };
};
generate = function (program) {
    return escodegen.generate(program);
};
wrap = function (code) {
    return [
        '(function () {',
        code,
        '}.call(typeof module !== "undefined" ? module.exports : this))'
    ];
};
this.compile = compile = function (code, context, evald) {
    return wrap(noWrap(code, context, evald));
};
noWrap = function (code, context, evald) {
    return generate(ast(parse(tokenize(code)), context, evald));
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
this.run = run = function (code) {
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
this.output = output = function (list) {
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
startRepl = function () {
    var context;
    context = {};
    repl(function (data) {
        print(eval(noWrap(data, context, true)));
        return prompt();
    });
    return prompt();
};
prompt = function (chunk) {
    return process.stdout.write('memory> ');
};
repl = function (fn) {
    var stdin;
    stdin = process.openStdin();
    stdin.setEncoding('utf8');
    return stdin.on('data', fn);
};
this.memory = memory = function (action, item) {
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
    case !(action === 'help'):
        return displayHelp();
    default:
        return startRepl();
    }
};
}.call(typeof module !== "undefined" ? module.exports : this))
