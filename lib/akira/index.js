module.exports = (function () {
    var util, me, akira, run, lex, genAst, writeFile, getFiles, help, startRepl, watch, exports, output, analyse, loadMakefile;
    var map;
    map = function (f, vec) {
        return Array.prototype.map.call(vec, f);
    };
    var show;
    show = function (i) {
        return i.toString();
    };
    var print;
    print = function (args) {
        args = Array.prototype.slice.call(arguments, 0)
        return console.log.apply(console, args);
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
    var $$73272e = function ($$export) {
            var util, escodegen, dune, getFiles, lexer, parser, toAst, transform, lex, parse, genAst, transpile, akira, run;
            util = require('util');
            escodegen = require('escodegen');
            dune = require('dune');
            var $$ref;
            $$ref = $$929d8e;
            getFiles = $$ref.getFiles;
            lexer = require('../lang/lexer');
            parser = require('../lang/grammar');
            parser.yy = require('../lang/nodes');
            toAst = function (body) {
                return {
                    type: 'Program',
                    body: [{
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
                        }]
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
            run = function (name, code, context) {
                var result;
                try {
                    result = dune.string(code, name, context);
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
                transform: transform,
                escodegen: escodegen
            };
        }();
    var $$884db1 = function ($$export) {
            var help;
            help = function () {
                print('               akira');
                print('');
                print('ast [file]               - output the Mozilla Parse API for that file');
                print('compile [file] [target]  - compile to JavaScript');
                print('output [file]            - compile to JS and output');
                print('run [file]               - compile and interpret said file');
                print('make [command] [args]    - run akira unit tests');
                print('tokens [file]            - output the lexer tokens for that file');
                print('version                  - akira version');
                print('watch [file] [target]    - watch a file for changes and compile on change');
                return print('');
            };
            return help;
        }();
    var $$3763f2 = function ($$export) {
            var context, vm, util, parse, transform, escodegen, xform, toCode, prompt, inspect, readEvalPrintLoop, startRepl;
            context = {console: console};
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
    var $$ref;
    $$ref = $$929d8e;
    writeFile = $$ref.writeFile;
    getFiles = $$ref.getFiles;
    help = $$884db1;
    startRepl = $$3763f2;
    watch = $$37e60b;
    exports = function (name, code, from, to) {
        return writeFile(name, 'module.exports = '.concat(code), from, to);
    };
    output = function (name, code) {
        return util.puts(code);
    };
    analyse = function (name, body) {
        return output(null, function (data) {
            return util.inspect(data, false, 50);
        }(body));
    };
    loadMakefile = function (key, opts) {
        return function (name, code) {
            var cmd, make;
            cmd = key.replace(/[-+|:]([a-zA-Z0-9$_])/g, function (i) {
                return i[1].toUpperCase();
            });
            make = run(name, 'module.exports = '.concat(code));
            return make[cmd](opts);
        };
    };
    return {
        cli: function (action, $$vec1) {
            var $$offset1 = 0, a = $$vec1[$$offset1++], b = $$vec1[$$offset1++], c = $$vec1.slice(2, ($$offset1 = ($$vec1.length - 0)));
            switch (false) {
            case !(action === 'compile'):
                return this.compile(a, b);
            case !(action === 'output'):
                return this.output(a);
            case !(action === 'run'):
                return this.run(a);
            case !(action === 'tokens'):
                return akira(analyse, a, lex);
            case !(action === 'ast'):
                return akira(analyse, a, genAst);
            case !(action === 'version'):
                return output(null, 'akira '.concat(me.version));
            case !(action === 'watch'):
                return watch(a, function () {
                    return akira(function (name, code) {
                        return exports(name, code, a, b);
                    }, a);
                });
            case !(action === 'make'):
                return akira(loadMakefile(a, (b || []).concat(c)), 'Make.akira');
            case !!action:
                return startRepl();
            default:
                return help();
            }
        },
        compile: function (from, target) {
            return akira(function (name, code) {
                return exports(name, code, from, target);
            }, from);
        },
        output: function (filename) {
            return akira(output, filename);
        },
        run: function (filename, context) {
            return akira(function (name, code) {
                return run(name, code, context);
            }, filename);
        }
    };
}());