module.exports = (function ($$export) {
    var util, me, memory, run, lex, genAst, benchmark, writeFile, getFiles, wrap, output, analyse, MEM;
    util = require('util');
    me = require('../../package.json');
    {
        var $$ref;
        $$ref = require('./memory');
        memory = $$ref.memory;
        run = $$ref.run;
        lex = $$ref.lex;
        genAst = $$ref.genAst;
        benchmark = $$ref.benchmark;
    }
    {
        var $$ref;
        $$ref = require('./fisy');
        writeFile = $$ref.writeFile;
        getFiles = $$ref.getFiles;
    }
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
        case !(action === 'help'):
            return require('./help');
        default:
            return null;
        }
    };
}());