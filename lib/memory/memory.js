module.exports = (function ($$export) {
    var merge = function merge(base, obj) {
        Object.keys(obj).forEach(function (key) {
            base[key] = obj[key];
        });
    };
    var vm, util, escodegen, getFiles, mark, lexer, parser, transform, lex, parse, genAst, transpile, benchmark, memory, run;
    vm = require('vm');
    util = require('util');
    escodegen = require('escodegen');
    var $$ref;
    $$ref = require('./fisy');
    getFiles = $$ref.getFiles;
    var $$ref;
    $$ref = require('./bench');
    mark = $$ref.mark;
    lexer = require('../lexer');
    parser = require('../grammar');
    merge(parser.yy, require('../nodes'));
    transform = function (name, parsed) {
        var context, body;
        context = {};
        body = parsed.compile(context, name);
        return {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [
                                {
                                    type: 'Identifier',
                                    name: '$$export'
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: parsed.getUtils(context).concat(parsed.addVars(context, false), body)
                            }
                        },
                        arguments: []
                    }
                }
            ]
        };
    };
    lex = function (name, code) {
        return lexer(code);
    };
    parse = function (name, code) {
        return parser.parse(lex(name, code));
    };
    genAst = function (name, code) {
        return transform(name, parse(name, code));
    };
    transpile = function (name, code) {
        return escodegen.generate(genAst(name, code));
    };
    benchmark = function (name, code) {
        var a, tokens, b, tree, c, parseapi, d;
        var $$ref;
        $$ref = mark(function () {
            return lexer(code);
        });
        a = $$ref.time;
        tokens = $$ref.result;
        var $$ref;
        $$ref = mark(function () {
            return parser.parse(tokens);
        });
        b = $$ref.time;
        tree = $$ref.result;
        var $$ref;
        $$ref = mark(function () {
            return transform(name, tree);
        });
        c = $$ref.time;
        parseapi = $$ref.result;
        var $$ref;
        $$ref = mark(function () {
            return escodegen.generate(parseapi);
        });
        d = $$ref.time;
        return {
            name: name,
            Lexer: a + 'ms',
            Parser: b + 'ms',
            Transform: c + 'ms',
            Compile: d + 'ms',
            Total: a + b + c + d + 'ms'
        };
    };
    memory = function (cb, filepath, fn) {
        var onFile;
        if (fn == null)
            fn = transpile;
        onFile = function (name, code) {
            var result;
            try {
                result = cb(name, fn(name, code));
            } catch (err) {
                util.error('Filename: '.concat(name));
                throw new Error(err);
            }
            return result;
        };
        return getFiles(onFile, filepath);
    };
    run = function (name, code) {
        var result;
        try {
            result = vm.runInNewContext(code, {
                console: console
            });
        } catch (err) {
            util.error(name);
            util.error(err.stack);
        }
        return result;
    };
    return {
        lex: lex,
        parse: parse,
        genAst: genAst,
        transpile: transpile,
        run: run,
        memory: memory,
        benchmark: benchmark
    };
}());