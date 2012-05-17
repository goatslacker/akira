var TOKEN = regexp('^([a-zA-Z]+)');
var NUMBER = regexp('^(\\d*\\.?\\d+)+');
var lambda = regexp('^->');
var operation = regexp('^(<=|>=|>|<|==|!=|\\|\\||\\&\\&|\u2264|\u2265)+');
var newline = regexp('^\\n');
var comments = regexp('^#');
var whitespace = regexp('^ ');
var KEYWORDS = [
        'arguments',
        'if',
        'then',
        'else',
        'import',
        'export'
    ];
var COMPARE = [
        '==',
        '!=',
        '>',
        '>=',
        '<',
        '<=',
        'is',
        'not',
        '\u2264',
        '\u2265'
    ];
var LOGIC = [
        'and',
        'or',
        '&&',
        '||'
    ];
var BOOLEAN = [
        'true',
        'false'
    ];
var processToken = function processToken(item, lineNo) {
    var index = call(KEYWORDS, 'indexOf', item);
    var isKeyword = index >= 0;
    if (isKeyword) {
        var key = call(item, 'toUpperCase');
        return [
            key,
            item,
            lineNo
        ];
    } else {
        return false;
    }
};
var types = [
        'TOKEN',
        'NUMBER'
    ];
var getType = function getType(code, cb) {
    var type = filter(function (type) {
            return call(type, 'test', code);
        }, types);
    return at(type, 1);
};
var tokenize = function tokenize(code, lineNo) {
    var tokens = [
            null
        ];
    var len = length(code);
    if (len == 0) {
        return tokens;
    } else {
        var work = function work(a) {
            switch (a) {
            case 'TOKEN':
                return function () {
                    return processToken;
                }();
            }
        };
        var type = getType(code);
        var fn = work(type);
        var item = fn(code);
        if (item) {
            push(tokens, item);
            var i = length(item);
        } else {
            var i = 1;
        }
        var chunk = call(code, 'substr', i, len);
        var tokens = call(tokens, 'concat', tokenize(chunk, lineNo));
        return tokens;
    }
};
var generateTokens = function generateTokens(code) {
    return tokenize(call(code, 'trim'), 0);
};
var Lexer = {
        tokenize: generateTokens
    };
this.Lexer = Lexer;
