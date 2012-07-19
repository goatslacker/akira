module.exports = (function ($$export) {
    var merge = function merge(base, obj) {
        Object.keys(obj).forEach(function (key) {
            base[key] = obj[key];
        });
    };
    var vm, util, escodegen, getFiles, lexer, parser, lex, parse, genAst, transpile, memory, run;
    vm = require('vm');
    util = require('util');
    escodegen = require('escodegen');
    {
        var $$ref;
        $$ref = require('./fisy');
        getFiles = $$ref.getFiles;
    }
    lexer = require('../lexer');
    parser = require('../grammar');
    merge(parser.yy, require('../nodes'));
    lex = function (name, code) {
        return lexer(code);
    };
    parse = function (name, code) {
        return parser.parse(lex(name, code));
    };
    genAst = function (name, code) {
        var parsed, context, body;
        parsed = parse(name, code);
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
    transpile = function (name, code) {
        return escodegen.generate(genAst(name, code));
    };
    memory = function (cb, filepath, fn) {
        if (fn == null)
            fn = transpile;
        return getFiles(function (name, code) {
            return cb(name, fn(name, code));
        }, filepath);
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
        genAst: genAst,
        run: run,
        memory: memory
    };
}());