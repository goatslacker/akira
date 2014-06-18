(function () {
    var util, me, _$m, foreachFile, run, lexer, genAst, writeFile, help, startRepl, watch, output, analyse, loadMakefile, compile, fileOutput, make, _$929d8e, _$73272e, _$884db1, _$3763f2, _$37e60b;
    var map = function (f, vec) {
        return Array.prototype.map.call(vec, function () {
            return f(arguments[0]);
        });
    };
    var show = function (i) {
        return i.toString();
    };
    var print = function (args) {
        args = Array.prototype.slice.call(arguments, 0, arguments.length - 0);
        return console.log.apply(console, args);
    };
    var head = function (_$fv) {
        var x;
        x = _$fv[0];
        return x;
    };
    var tail = function (_$fv) {
        var x, xs;
        x = _$fv[0];
        xs = _$fv.slice(1, _$fv.length - 0);
        return xs;
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
                    return map(function () {
                        return walk(cb, path.join(tree, arguments[0]));
                    }, fs.readdirSync(tree));
                } else {
                    return tree.indexOf('.akira') >= 0 ? getFileContents(cb, tree) : null;
                }
            }.apply(this, arguments);
        };
        getFileContents = function (cb, filepath) {
            return cb(filepath, show(fs.readFileSync(path.join(process.env.PWD, filepath))));
        };
        getFiles = function (cb, dirname) {
            var stat;
            stat = fs.statSync(dirname);
            return stat.isDirectory() ? walk(cb, dirname) : getFileContents(cb, dirname);
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
        var _$m, getFiles, util, escodegen, dune, lexer, parser, toAst, transform, parse, genAst, transpile, eachFile, foreachFile, run;
        _$m = _$929d8e;
        getFiles = _$m.getFiles;
        util = require('util');
        escodegen = require('escodegen');
        dune = require('dune');
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
                    return f('');
                default:
                    context = {};
                    body = parsed.compile(context, name);
                    dependencies = parsed.addDeps(context);
                    parsed.flagCoreMethods(body);
                    return f(parsed.addVars(context).concat(parsed.addCore(), dependencies, parsed.addContracts(body)));
                }
            }.apply(this, arguments);
        };
        parse = function (code) {
            return parser.parse(lexer(code));
        };
        genAst = function (name, code) {
            return transform(name, parse(code));
        };
        transpile = function (name, code) {
            return escodegen.generate(genAst(name, code));
        };
        eachFile = function (cb, f) {
            return function (name, code) {
                try {
                    return cb(name, f(name, code));
                } catch (err) {
                    util.error('Filename '.concat(name));
                    util.error(err.stack);
                    return process.exit(1);
                }
            };
        };
        foreachFile = function (cb, filepath, f) {
            if (f == null)
                f = transpile;
            return getFiles(eachFile(cb, f), filepath);
        };
        run = function (name, code, context) {
            try {
                return dune.string(code, name, context);
            } catch (err) {
                util.error(name);
                util.error(err.stack);
                return null;
            }
        };
        return {
            foreachFile: foreachFile,
            genAst: genAst,
            lexer: lexer,
            run: run
        };
    }();
    _$884db1 = function () {
        var text, help;
        text = [
            '',
            'ast [file]               - output the Mozilla Parse API for that file',
            'compile [file] [target]  - compile to JavaScript',
            'make [command] [args]    - run akira unit tests',
            'output [file]            - compile to JS and output',
            'repl                     - start the repl',
            'run [file]               - compile and interpret said file',
            'tokens [file]            - output the lexer tokens for that file',
            'version                  - akira version',
            'watch [file] [target]    - watch a file for changes and compile on change',
            ''
        ];
        help = function (invalid) {
            switch (false) {
            case !(arguments.length === 1):
                return print(['ERR Invalid command ' + (invalid) + ''].concat(text));
            default:
                return print(text);
            }
        };
        return help;
    }();
    _$3763f2 = function () {
        return null;
    }();
    _$37e60b = function () {
        var nodewatch, watch;
        nodewatch = require('nodewatch');
        watch = function (filename, callback) {
            return function (it) {
                return it.onChange(callback);
            }(nodewatch.add(filename));
        };
        return watch;
    }();
    util = require('util');
    me = require('../../package.json');
    _$m = _$73272e;
    foreachFile = _$m.foreachFile;
    run = _$m.run;
    lexer = _$m.lexer;
    genAst = _$m.genAst;
    _$m = _$929d8e;
    writeFile = _$m.writeFile;
    help = _$884db1;
    startRepl = _$3763f2;
    watch = _$37e60b;
    output = function (_$fp0, code) {
        return process.stdout.write(code);
    };
    analyse = function (_$fp0, body) {
        return output(null, function () {
            return util.inspect(arguments[0], false, Infinity);
        }(body));
    };
    loadMakefile = function (key, opts) {
        return function (name, code) {
            return function () {
                var cmd;
                cmd = function (it) {
                    return it.replace(/[-+|:]([a-zA-Z0-9$_])/g, function (i) {
                        return i[1].toUpperCase();
                    });
                }(key);
                return function () {
                    return arguments[0](opts);
                }(run(name, 'module.exports = '.concat(code))[cmd]);
            }.apply(this, arguments);
        };
    };
    compile = function (from, target) {
        return foreachFile(function (name, code) {
            return writeFile(name, code, from, target);
        }, from);
    };
    fileOutput = function () {
        return foreachFile(output, arguments[0]);
    };
    make = function (cmd, arg, args) {
        if (arg == null)
            arg = [];
        return foreachFile(loadMakefile(cmd, arg.concat(args)), 'Make.akira');
    };
    module.exports = {
        cli: function (args) {
            var cmd, opts;
            cmd = head(args);
            opts = tail(args);
            return function () {
                switch (false) {
                case !(cmd === 'make'):
                    return make(opts[0], opts[1], opts[2]);
                case !(cmd === 'compile'):
                    return compile(opts[0], opts[1]);
                case !(cmd === 'output'):
                    return map(fileOutput, opts);
                case !(cmd === 'run'):
                    return null;
                case !(cmd === 'version'):
                    return output(null, 'akira '.concat(me.version));
                case !(cmd === 'repl' || typeof cmd === 'undefined'):
                    return startRepl();
                case !(cmd === 'help'):
                    return help();
                default:
                    return help(opts);
                }
            }.apply(this, arguments);
        },
        compile: compile,
        output: fileOutput,
        run: function (filename, context) {
            return foreachFile(function (name, code) {
                return run(name, code, context);
            }, filename);
        }
    };
}());