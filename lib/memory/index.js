module.exports = (function ($$export) {
    var util, me, memory, run, lex, genAst, writeFile, getFiles, wrap, output, analyse, MEM;
    util = require('util');
    me = require('../../package.json');
    {
        var $$ref;
        $$ref = require('./memory');
        memory = $$ref.memory;
        run = $$ref.run;
        lex = $$ref.lex;
        genAst = $$ref.genAst;
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
        return output(null, util.inspect(body, false, 50));
    };
    return MEM = function (action, filename) {
        switch (false) {
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