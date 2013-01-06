module.exports = (function () {
    var util, me, _$m, akira, run, lex, genAst, writeFile, getFiles, help, startRepl, watch, exports, output, analyse, loadMakefile, _$929d8e, _$73272e, _$884db1, _$3763f2, _$37e60b;
    var map = function (f, vec) {
        return Array.prototype.map.call(vec, function (x) {
            return f(x);
        });
    };
    var show = function (i) {
        return i.toString();
    };
    var print = function (args) {
        args = Array.prototype.slice.call(arguments, 0, arguments.length - 0);
        return console.log.apply(console, args);
    };
    _$929d8e = function () {
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
            return function () {
                if (stat.isDirectory()) {
                    return map(function (v) {
                        return walk(cb, path.join(tree, v));
                    }, fs.readdirSync(tree));
                } else {
                    return function () {
                        if (tree.indexOf('.akira') >= 0) {
                            return getFileContents(cb, tree);
                        } else {
                            return null;
                        }
                    }();
                }
            }();
        };
        getFileContents = function (cb, filepath) {
            return cb(filepath, show(fs.readFileSync(path.join(process.env.PWD, filepath))));
        };
        getFiles = function (cb, dirname) {
            var stat;
            stat = fs.statSync(dirname);
            return function () {
                if (stat.isDirectory()) {
                    return walk(cb, dirname);
                } else {
                    return getFileContents(cb, dirname);
                }
            }();
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
    _$73272e = function () {
        var util, escodegen, dune, _$m, getFiles, lexer, parser, toAst, transform, lex, parse, genAst, transpile, akira, run;
        util = require('util');
        escodegen = require('escodegen');
        dune = require('dune');
        _$m = _$929d8e;
        getFiles = _$m.getFiles;
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
            var context, body, dependencies;
            if (f == null)
                f = toAst;
            return function () {
                switch (false) {
                case !(parsed === null):
                    return toAst('');
                default:
                    context = {};
                    body = parsed.compile(context, name);
                    dependencies = parsed.addDeps(context);
                    parsed.flagCoreMethods(body);
                    return f(parsed.addVars(context).concat(parsed.addCore(), dependencies, body));
                }
            }();
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
    _$884db1 = function () {
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
    _$3763f2 = function () {
        var repl, context, vm, util, _$m, parse, transform, escodegen, xform, toCode, inspect, readEvalPrintLoop;
        repl = require('repl');
        context = {console: console};
        vm = require('vm');
        util = require('util');
        _$m = _$73272e;
        parse = _$m.parse;
        transform = _$m.transform;
        escodegen = _$m.escodegen;
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
        readEvalPrintLoop = function (data, _$fp1, filename, cb) {
            var code;
            try {
                code = toCode(filename, data);
                return cb(inspect(vm.runInNewContext(code, context)));
            } catch (err) {
                util.error(err.stack);
            }
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
    _$37e60b = function () {
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
    _$m = _$73272e;
    akira = _$m.akira;
    run = _$m.run;
    lex = _$m.lex;
    genAst = _$m.genAst;
    _$m = _$929d8e;
    writeFile = _$m.writeFile;
    getFiles = _$m.getFiles;
    help = _$884db1;
    startRepl = _$3763f2;
    watch = _$37e60b;
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
        cli: function (_$p0, _$p1) {
            var a, b, c;
            a = _$p1[0];
            b = _$p1[1];
            c = _$p1.slice(2, _$p1.length - 0);
            switch (false) {
            case !(_$p0 == null && arguments.length === 1):
                return startRepl();
            case !(_$p0 === 'compile' && _$p1.length === 2 && arguments.length === 2):
                return this.compile(a, b);
            case !(_$p0 === 'output' && _$p1.length === 1 && arguments.length === 2):
                return this.output(a);
            case !(_$p0 === 'run' && _$p1.length === 1 && arguments.length === 2):
                return this.run(a);
            case !(_$p0 === 'tokens' && _$p1.length === 1 && arguments.length === 2):
                return akira(analyse, a, lex);
            case !(_$p0 === 'ast' && _$p1.length === 1 && arguments.length === 2):
                return akira(analyse, a, genAst);
            case !(_$p0 === 'version' && arguments.length === 1):
                return output(null, 'akira '.concat(me.version));
            case !(_$p0 === 'watch' && _$p1.length === 2 && arguments.length === 2):
                return watch(a, function () {
                    return akira(function (name, code) {
                        return exports(name, code, a, b);
                    }, a);
                });
            case !(_$p0 === 'make' && true && arguments.length === 2):
                return akira(loadMakefile(a, (b || []).concat(c)), 'Make.akira');
            default:
                return function () {
                    if (!arguments[0]) {
                        return startRepl();
                    } else {
                        return help();
                    }
                }();
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