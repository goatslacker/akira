module.exports = (function () {
    var util, me, akira, run, lex, genAst, benchmark, writeFile, getFiles, startRepl, watch, exports, analyse, loadMakefile, output, cli;
    var map;
    map = function (f, vec) {
        return Array.prototype.map.call(vec, f);
    };
    var show;
    show = function (i) {
        return i.toString();
    };
    var $$929d8e = function ($$export) {
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
                    if (tree.indexOf('.akira') >= 0) {
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
            writeFile = function (file, code, from, to) {
                var filename;
                if (to == null)
                    to = path.dirname(file);
                filename = path.relative(from, file) || path.basename(file);
                return fs.writeFileSync(path.join(to, filename.replace('.akira', '.js')), code);
            };
            return {
                getFiles: getFiles,
                writeFile: writeFile
            };
        }();
    var $$c0be28 = function ($$export) {
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
    var $$73272e = function ($$export) {
            var util, escodegen, dune, getFiles, mark, lexer, parser, toAst, transform, lex, parse, genAst, transpile, benchmark, akira, run;
            util = require('util');
            escodegen = require('escodegen');
            dune = require('dune');
            var $$ref;
            $$ref = $$929d8e;
            getFiles = $$ref.getFiles;
            var $$ref;
            $$ref = $$c0be28;
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
                                    params: [],
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
                    Lexer: a + 'ms',
                    Parser: b + 'ms',
                    Transform: c + 'ms',
                    Compile: d + 'ms',
                    Total: a + b + c + d + 'ms'
                };
            };
            akira = function (cb, filepath, f) {
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
                    result = dune.string(code, name);
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
                akira: akira,
                benchmark: benchmark,
                transform: transform,
                escodegen: escodegen
            };
        }();
    var $$3763f2 = function ($$export) {
            var context, vm, util, parse, transform, escodegen, xform, toCode, prompt, inspect, readEvalPrintLoop, startRepl;
            context = {
                console: console
            };
            vm = require('vm');
            util = require('util');
            var $$ref;
            $$ref = $$73272e;
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
                return process.stdout.write('akira> ');
            };
            inspect = function (val) {
                return util.inspect(val, false, 35);
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
    var $$37e60b = function ($$export) {
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
    $$ref = $$73272e;
    akira = $$ref.akira;
    run = $$ref.run;
    lex = $$ref.lex;
    genAst = $$ref.genAst;
    benchmark = $$ref.benchmark;
    var $$ref;
    $$ref = $$929d8e;
    writeFile = $$ref.writeFile;
    getFiles = $$ref.getFiles;
    startRepl = $$3763f2;
    watch = $$37e60b;
    exports = function (name, code, from, to) {
        return writeFile(name, 'module.exports = '.concat(code), from, to);
    };
    analyse = function (name, body) {
        return output(null, function (data) {
            return util.inspect(data, false, 50);
        }(body));
    };
    loadMakefile = function (key, opts) {
        return function (name, code) {
            var make;
            make = run(name, 'module.exports = '.concat(code));
            return make[key](opts);
        };
    };
    output = function (filename) {
        return akira(function (name, code) {
            return util.puts(code);
        }, filename);
    };
    cli = function (action, $$vec1) {
        var $$offset1 = 0, a = $$vec1[$$offset1++], b = $$vec1[$$offset1++], c = $$vec1.slice(2, ($$offset1 = ($$vec1.length - 0)));
        switch (false) {
        case !(action === 'compile'):
            return akira(function (name, code) {
                return exports(name, code, a, b);
            }, a);
        case !(action === 'output'):
            return output(a);
        case !(action === 'run'):
            return akira(run, a);
        case !(action === 'tokens'):
            return akira(analyse, a, lex);
        case !(action === 'ast'):
            return akira(analyse, a, genAst);
        case !(action === 'version'):
            return output(null, 'akira '.concat(me.version));
        case !(action === 'watch'):
            return watch(a, function () {
                return akira(wrap, a);
            });
        case !(action === 'make'):
            return akira(loadMakefile(a, (b || []).concat(c)), 'Make.akira');
        case !(action === 'help'):
            return require('./help');
        default:
            return startRepl();
        }
    };
    return {
        cli: cli,
        output: output
    };
}());