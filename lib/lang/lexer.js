module.exports = (function () {
    var rx, identifiers, ignore, getType, extract, parseAlphanumeric, returnIdentifier, parseIdentifier, parseRegularExpressions, getToken, processChunk, getLength, incrLine, getNextIndex, returnTokens, filterWhitespace, tokenize;
    var find;
    find = function (f, ds) {
        for (var i in ds) {
            if (f(ds[i]) === true) {
                return i;
            }
        }
    };
    rx = {
        IDENTIFIER: /^([a-zA-Z_$][0-9a-zA-Z_\-]*[\?]?)/,
        KEY: /^(@[a-zA-Z_$][0-9a-zA-Z_\-]*[\?]?)/,
        NUM: /^(-?([0-9]+[\.e])?[0-9]+,?)+/,
        STR: /^'(.*?)'/,
        ARGS: /^&([0-9]+)/,
        LAMBDA: /^->/,
        OPERATION: /^(<\+|<=|>=|>|<|(!|=)==?|\|\||\&\&|!!|\+\+|\+:)+/,
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
            'fn',
            'raise',
            'prototype',
            'recur',
            'macro',
            'cond'
        ],
        TYPE: [
            'Function',
            'Number',
            'String',
            'Array',
            'Object',
            'Null'
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
        RIGHT_OPERATORS: ['+:'],
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
        return find(function (x) {
            return x.test(a);
        }, rx);
    };
    extract = function (key, chunk) {
        return rx[key].exec(chunk);
    };
    parseAlphanumeric = function (t, chunk, n) {
        if (n == null)
            n = 1;
        return extract(t, chunk)[n];
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
        var item, token;
        item = extract(t, chunk);
        token = find(function (x) {
            return x.indexOf(item[1]) >= 0;
        }, identifiers);
        return returnIdentifier(token || t, item[1]);
    };
    parseRegularExpressions = function (t, chunk) {
        var item, regexp;
        item = extract(t, chunk);
        regexp = RegExp(item[2], item[3]);
        return [
            'REGEXP',
            regexp
        ];
    };
    getToken = function (t, chunk) {
        switch (false) {
        case !(t === 'IDENTIFIER' && arguments.length === 2):
            return parseIdentifier(t, chunk);
        case !(t === 'KEY' && arguments.length === 2):
            return parseIdentifier(t, chunk);
        case !(t === 'NUM' && arguments.length === 2):
            return parseAlphanumeric(t, chunk, 0);
        case !(t === 'STR' && arguments.length === 2):
            return parseAlphanumeric(t, chunk);
        case !(t === 'OPERATION' && arguments.length === 2):
            return parseIdentifier(t, chunk);
        case !(t === 'LAMBDA' && arguments.length === 2):
            return 'FN';
        case !(t === 'REGEX' && arguments.length === 2):
            return parseRegularExpressions(t, chunk);
        case !(t === 'COMMENTS' && arguments.length === 2):
            return parseAlphanumeric(t, chunk);
        case !(t === 'ARGS' && arguments.length === 2):
            return [
                t,
                extract(t, chunk)[1]
            ];
        case !(t === 'WHITESPACE' && arguments.length === 2):
            return ' ';
        case !(t === 'TERMINATOR' && arguments.length === 2):
            return ' ';
        case !(arguments.length === 2):
            return [
                chunk[0],
                chunk[0]
            ];
        }
    };
    processChunk = function (code, n) {
        var type, token;
        type = getType(code);
        token = getToken(type, code);
        if (Array.isArray(token)) {
            token.push(n.line);
            return token;
        } else {
            return [
                type,
                token,
                n.line
            ];
        }
    };
    getLength = function ($$p0, i) {
        switch (false) {
        case !($$p0 === 'STR' && arguments.length === 2):
            return i + 2;
        case !($$p0 === 'ARGS' && arguments.length === 2):
            return i + 1;
        default:
            return i;
        }
    };
    incrLine = function ($$p0, line) {
        switch (false) {
        case !($$p0 === 'TERMINATOR' && arguments.length === 2):
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
        var index, token;
        while (true) {
            switch (false) {
            case !(arguments.length === 2):
                return returnTokens(code, n, []);
            case !(code === '' && arguments.length === 3):
                return tokens;
            default:
                var $$ref;
                $$ref = getNextIndex(processChunk(code, n));
                index = $$ref.index;
                token = $$ref.token;
                tokens.push(token);
                var $$recur0 = code.substr(index, code.length);
                var $$recur1 = {line: incrLine(token[0], n.line)};
                var $$recur2 = tokens;
                code = $$recur0;
                n = $$recur1;
                tokens = $$recur2;
                continue;
                return null;
            }
        }
    };
    filterWhitespace = function (token) {
        return !ignore[token[0]];
    };
    return tokenize = function (code) {
        return returnTokens(code, {
            index: 0,
            line: 0
        }).filter(filterWhitespace);
    };
}());