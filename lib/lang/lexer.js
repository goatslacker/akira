(function () {
    var rx, identifiers, ignore, getType, extract, parseAlphanumeric, returnToken, returnIdentifier, parseIdentifier, convertRegexp, returnTokenRegexp, parseRegularExpressions, getToken, processChunk, getLength, incrLine, getNextIndex, returnTokens, filterWhitespace, tokenize;
    var find = function (f, ds) {
        for (var i in ds) {
            if (f(ds[i]) === true) {
                return i;
            }
        }
    };
    var _$tg = require('tg');
    rx = {
        IDENTIFIER: /^([a-zA-Z_$][0-9a-zA-Z_\-]*[\?]?)/,
        KEY: /^(@[a-zA-Z_$][0-9a-zA-Z_\-]*[\?]?)/,
        NUM: /^(-?([0-9]+[\.e])?[0-9]+,?)+/,
        STR: /^'(.*?)'/,
        ARGS: /^&([0-9]+)/,
        LAMBDA: /^->/,
        OPERATION: /^(<-|<<|<=|>=|>|<|(!|=)==?|\|\||\&\&|!!|\+\+|\+:|::)/,
        TERMINATOR: /^\n/,
        REGEX: /^(\/((?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*)\/)([imgy]{0,4})(?!\w)/,
        COMMENTS: /^(--.*)/,
        WHITESPACE: /^ /
    };
    identifiers = {
        KEYWORDS: [
            'if',
            'then',
            'else',
            'import',
            'export',
            'try',
            'catch',
            'none',
            'do',
            'let',
            'fn',
            'raise',
            'prototype',
            'recur',
            'macro',
            'cond',
            'match',
            'maybe',
            'Maybe',
            'module',
            'class',
            'task'
        ],
        COMPARE: [
            '==',
            '!=',
            '>',
            '>=',
            '<',
            '<=',
            'is',
            'isnt'
        ],
        LEFT_OPERATORS: [
            '++',
            '!!'
        ],
        RIGHT_OPERATORS: [
            '+:',
            '<<'
        ],
        DO_OPERATOR: ['<-'],
        TYPE_OPERATOR: ['::'],
        NOT: ['not'],
        LOGIC: [
            '&&',
            '||'
        ],
        BOOL: [
            'true',
            'false'
        ]
    };
    ignore = {
        COMMENTS: 'COMMENTS',
        WHITESPACE: 'WHITESPACE'
    };
    getType = function (a) {
        return find(function () {
            return arguments[0].test(a);
        }, rx);
    };
    extract = function (key, chunk) {
        return function (it) {
            return it.exec(chunk);
        }(rx[key]);
    };
    parseAlphanumeric = function (t, chunk, n) {
        if (n == null)
            n = 1;
        return extract(t, chunk)[n];
    };
    returnToken = function (type) {
        return function () {
            return [
                type,
                arguments[0]
            ];
        };
    };
    returnIdentifier = function (type, item) {
        switch (false) {
        case !(type === 'KEYWORDS' && arguments.length === 2):
            return [
                item.toUpperCase(),
                item
            ];
        case !(arguments.length === 2):
            return [
                type,
                item
            ];
        }
    };
    parseIdentifier = function (t, chunk) {
        return function () {
            var token, item;
            item = extract(t, chunk);
            token = find(function () {
                return arguments[0].indexOf(item[1]) >= 0;
            }, identifiers);
            return returnIdentifier(token || t, item[1]);
        }();
    };
    convertRegexp = function (item) {
        return RegExp(item[2], item[3]);
    };
    returnTokenRegexp = returnToken('REGEXP');
    parseRegularExpressions = function () {
        return returnTokenRegexp(convertRegexp(extract.apply(null, arguments)));
    };
    getToken = function (type, chunk) {
        return function () {
            switch (false) {
            case !(type === 'IDENTIFIER' || type === 'KEY' || type === 'OPERATION'):
                return parseIdentifier.apply(null, arguments);
            case !(type === 'NUM'):
                return parseAlphanumeric(type, chunk, 0);
            case !(type === 'STR' || type === 'COMMENTS'):
                return parseAlphanumeric.apply(null, arguments);
            case !(type === 'LAMBDA'):
                return 'FN';
            case !(type === 'REGEX'):
                return parseRegularExpressions.apply(null, arguments);
            case !(type === 'ARGS'):
                return [
                    type,
                    extract(type, chunk)[1]
                ];
            case !(type === 'WHITESPACE' || type === 'TERMINATOR'):
                return ' ';
            default:
                return [
                    chunk[0],
                    chunk[0]
                ];
            }
        }.apply(this, arguments);
    };
    processChunk = function (code, n) {
        return function () {
            var token, type;
            type = getType(code);
            token = getToken(type, code);
            return Object.prototype.toString.call(token) === '[object Array]' ? token.concat([n.line]) : [
                type,
                token,
                n.line
            ];
        }();
    };
    getLength = function (_$p0, i) {
        switch (false) {
        case !(_$p0 === 'STR' && arguments.length === 2):
            return i + 2;
        case !(_$p0 === 'ARGS' && arguments.length === 2):
            return i + 1;
        default:
            return i;
        }
    };
    incrLine = function (_$p0, line) {
        switch (false) {
        case !(_$p0 === 'TERMINATOR' && arguments.length === 2):
            return line + 1;
        default:
            return line;
        }
    };
    getNextIndex = function (token) {
        return {
            index: getLength(token[0], token[1].toString().length),
            token: token
        };
    };
    returnTokens = function (code, n, tokens) {
        var _$m, index, token;
        while (true) {
            switch (false) {
            case !(arguments.length === 2):
                return returnTokens(code, n, []);
            case !(code === '' && arguments.length === 3):
                return tokens;
            default:
                _$m = getNextIndex(processChunk(code, n));
                index = _$m.index;
                token = _$m.token;
                tokens.push(token);
                var _$r0 = code.substr(index, code.length);
                var _$r1 = {line: incrLine(token[0], n.line)};
                var _$r2 = tokens;
                code = _$r0;
                n = _$r1;
                tokens = _$r2;
                continue;
                return null;
            }
        }
    };
    filterWhitespace = function (token) {
        return !ignore[token[0]];
    };
    tokenize = function (code) {
        _$tg([String], [code]);
        return _$tg(Array, function () {
            return function (it) {
                return it.filter(filterWhitespace);
            }(returnTokens(code, {
                index: 0,
                line: 0
            }));
        }.apply(this, arguments));
    };
    module.exports = tokenize;
}());