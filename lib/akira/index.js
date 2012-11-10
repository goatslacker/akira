module.exports = (function () {
    var util, me, akira, run, lex, genAst, writeFile, getFiles, help, startRepl, watch, exports, output, analyse, loadMakefile;
    var map;
    map = function (f, vec) {
        return Array.prototype.map.call(vec, function (x) {
            return f(x);
        });
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
            var repl, context, vm, util, parse, transform, escodegen, xform, toCode, inspect, readEvalPrintLoop;
            repl = require('repl');
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
                return escodegen.generate(xform(parse(name, code)));
            };
            inspect = function (val) {
                return util.inspect(val, false, 35);
            };
            readEvalPrintLoop = function (data, _, filename, cb) {
                var code;
                try {
                    code = toCode(filename, data);
                    cb(inspect(vm.runInNewContext(code, context)));
                } catch (err) {
                    util.error(err.stack);
                }
                return true;
            };
            return function () {
                return repl.start({
                    prompt: 'akira> ',
                    input: process.stdin,
                    output: process.stdout,
                    eval: readEvalPrintLoop
                });
            };
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
        cli: function ($$p0, $$p1) {
            var a, b, __offset1, c;
            __offset1 = 0
            a = $$p1[__offset1++]
            b = $$p1[__offset1++]
            c = $$p1.slice(0, __offset1 = $$p1.length - 0)
            switch (false) {
            case !($$p0 == null && arguments.length === 1):
                return startRepl();
            case !($$p0 === 'compile' && $$p1.length === 2 && arguments.length === 2):
                return this.compile(a, b);
            case !($$p0 === 'output' && $$p1.length === 1 && arguments.length === 2):
                return this.output(a);
            case !($$p0 === 'run' && $$p1.length === 1 && arguments.length === 2):
                return this.run(a);
            case !($$p0 === 'tokens' && $$p1.length === 1 && arguments.length === 2):
                return akira(analyse, a, lex);
            case !($$p0 === 'ast' && $$p1.length === 1 && arguments.length === 2):
                return akira(analyse, a, genAst);
            case !($$p0 === 'version' && arguments.length === 1):
                return output(null, 'akira '.concat(me.version));
            case !($$p0 === 'watch' && $$p1.length === 2 && arguments.length === 2):
                return watch(a, function () {
                    return akira(function (name, code) {
                        return exports(name, code, a, b);
                    }, a);
                });
            case !($$p0 === 'make' && true && arguments.length === 2):
                return akira(loadMakefile(a, (b || []).concat(c)), 'Make.akira');
            default:
                if (!arguments[0]) {
                    return startRepl();
                } else {
                    return help();
                }
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