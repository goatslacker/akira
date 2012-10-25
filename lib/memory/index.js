module.exports = (function ($$export) {
    var util, me, memory, run, lex, genAst, benchmark, writeFile, getFiles, startRepl, watch, wrap, output, analyse, MEM;
    var map = function map(fn, list) {
        return Array.prototype.map.call(list, function (node, index, list) {
            return fn(node, index + 1, list);
        });
    };
    var show = function (i) {
        return i.toString();
    };
    var $$55ac3c = function ($$export) {
            var fs, path, walk, getFileContents, getFiles, writeFile;
            fs = require('fs');
            path = require('path');
            walk = function (cb, tree) {
                var stat;
                try {
                    stat = fs.statSync(tree);
                } catch (err) {
                    throw new Error(err);
                }
                if (stat.isDirectory()) {
                    return map(function (v) {
                        return walk(cb, path.join(tree, v));
                    }, fs.readdirSync(tree));
                } else {
                    if (tree.indexOf('.mem') >= 0) {
                        return getFileContents(cb, tree);
                    } else {
                        return null;
                    }
                }
            };
            getFileContents = function (cb, filepath) {
                return cb(filepath, show(fs.readFileSync(path.join(process.env.PWD, filepath))));
            };
            getFiles = function (cb, dirname) {
                var stat;
                stat = fs.statSync(dirname);
                if (stat.isDirectory()) {
                    return walk(cb, dirname);
                } else {
                    return getFileContents(cb, dirname);
                }
            };
            writeFile = function (file, code) {
                return fs.writeFileSync(path.join(process.env.PWD, function (name) {
                    return name.replace('.mem', '.js');
                }(file.replace('src', 'lib'))), code);
            };
            return {
                getFiles: getFiles,
                writeFile: writeFile
            };
        }();
    var $$2874c7 = function ($$export) {
            var util, mark;
            util = require('util');
            mark = function (f) {
                var start, result, end, time;
                start = Date.now();
                result = f();
                end = Date.now();
                time = end - start;
                return {
                    time: time,
                    result: result
                };
            };
            return {
                mark: mark
            };
        }();
    var $$e243ba = function ($$export) {
            var vm, util, escodegen, getFiles, mark, lexer, parser, toAst, transform, lex, parse, genAst, transpile, benchmark, memory, run;
            vm = require('vm');
            util = require('util');
            escodegen = require('escodegen');
            var $$ref;
            $$ref = $$55ac3c;
            getFiles = $$ref.getFiles;
            var $$ref;
            $$ref = $$2874c7;
            mark = $$ref.mark;
            lexer = require('../lang/lexer');
            parser = require('../lang/grammar');
            parser.yy = require('../lang/nodes');
            toAst = function (body) {
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
                                        body: body
                                    }
                                },
                                arguments: []
                            }
                        }
                    ]
                };
            };
            transform = function (name, parsed, f) {
                var context, body;
                if (f == null)
                    f = toAst;
                switch (false) {
                case !(parsed === null):
                    return toAst('');
                default:
                    context = {};
                    body = parsed.compile(context, name);
                    parsed.flagCoreMethods(body);
                    return f(parsed.addVars(context, false).concat(parsed.addCore(), parsed.addDeps(), body));
                }
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
                    Lexer: a.concat('ms'),
                    Parser: b.concat('ms'),
                    Transform: c.concat('ms'),
                    Compile: d.concat('ms'),
                    Total: (a + b + c + d).concat('ms')
                };
            };
            memory = function (cb, filepath, f) {
                var onFile;
                if (f == null)
                    f = transpile;
                onFile = function (name, code) {
                    var result;
                    try {
                        result = cb(name, f(name, code));
                    } catch (err) {
                        util.error('Filename: '.concat(name));
                        util.error(err.stack);
                        process.exit(1);
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
                benchmark: benchmark,
                transform: transform,
                escodegen: escodegen
            };
        }();
    var $$aa1d53 = function ($$export) {
            var context, vm, util, parse, transform, escodegen, xform, toCode, prompt, inspect, readEvalPrintLoop, startRepl;
            context = {
                console: console
            };
            vm = require('vm');
            util = require('util');
            var $$ref;
            $$ref = $$e243ba;
            parse = $$ref.parse;
            transform = $$ref.transform;
            escodegen = $$ref.escodegen;
            xform = function (data) {
                return transform('repl', data, function (ast) {
                    return {
                        type: 'Program',
                        body: ast
                    };
                });
            };
            toCode = function (name, code) {
                return escodegen.generate(xform(parse('repl', code)));
            };
            prompt = function () {
                return process.stdout.write('memory> ');
            };
            inspect = function (value) {
                return util.inspect(value, false, 35);
            };
            readEvalPrintLoop = function (data) {
                var code;
                try {
                    code = toCode('repl', data);
                    util.puts(inspect(vm.runInNewContext(code, context)));
                    util.puts('');
                } catch (err) {
                    util.error(err.stack);
                }
                return prompt();
            };
            startRepl = function () {
                var stdin;
                stdin = process.openStdin();
                stdin.setEncoding('utf-8');
                stdin.on('data', readEvalPrintLoop);
                return prompt();
            };
            return startRepl;
        }();
    var $$b8a09f = function ($$export) {
            var nodewatch, watch;
            nodewatch = require('nodewatch');
            watch = function (filename, callback) {
                return function (f) {
                    return f.onChange(callback);
                }(nodewatch.add(filename));
            };
            return watch;
        }();
    util = require('util');
    me = require('../../package.json');
    var $$ref;
    $$ref = $$e243ba;
    memory = $$ref.memory;
    run = $$ref.run;
    lex = $$ref.lex;
    genAst = $$ref.genAst;
    benchmark = $$ref.benchmark;
    var $$ref;
    $$ref = $$55ac3c;
    writeFile = $$ref.writeFile;
    getFiles = $$ref.getFiles;
    startRepl = $$aa1d53;
    watch = $$b8a09f;
    wrap = function (name, code) {
        return writeFile(name, 'module.exports = '.concat(code));
    };
    output = function (name, code) {
        return util.puts(code);
    };
    analyse = function (name, body) {
        return output(null, function (data) {
            return util.inspect(data, false, 50);
        }(body));
    };
    return MEM = function (action, filename) {
        if (filename == null)
            filename = 'src/';
        switch (false) {
        case !(action === 'bench'):
            return memory(analyse, filename, benchmark);
        case !(action === 'debug'):
            return memory(function () {
                return null;
            }, filename);
        case !(action === 'compile'):
            return memory(wrap, filename);
        case !(action === 'output'):
            return memory(output, filename);
        case !(action === 'test'):
            return memory(run, 'test/tests.mem');
        case !(action === 'run'):
            return memory(run, filename);
        case !(action === 'tokens'):
            return memory(analyse, filename, lex);
        case !(action === 'ast'):
            return memory(analyse, filename, genAst);
        case !(action === 'version'):
            return output(null, 'memory '.concat(me.version));
        case !(action === 'watch'):
            return watch(filename, function () {
                return memory(wrap, filename);
            });
        case !(action === 'help'):
            return require('./help');
        default:
            return startRepl();
        }
    };
}());