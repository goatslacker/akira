module.exports = (function ($$export) {
    var util;
    util = require('util');
    util.puts('               memory');
    util.puts('');
    util.puts('ast [file]     - output the Mozilla Parse API for that file');
    util.puts('compile [file] - compile to JavaScript');
    util.puts('output [file]  - compile to JS and output');
    util.puts('run [file]     - compile and interpret said file');
    util.puts('test           - run memory unit tests');
    util.puts('tokens [file]  - output the lexer tokens for that file');
    util.puts('version        - memory version');
    util.puts('watch [file]   - watch a file for changes and compile on change');
    util.puts('');
}());