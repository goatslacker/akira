module.exports = (function ($$export) {
    var LazyObject, rx, identifiers, ignore, getType, extract, parseAlphanumeric, returnIdentifier, parseIdentifier, parseRegularExpressions, getToken, processChunk, getLength, incrLine, returnTokens, filterWhitespace, tokenize;
    var $$770d6a = function ($$export) {
            function LazyObject(ds) {
                this.ds = ds;
                this.keys = Object.keys(ds);
                this.keys.forEach(function (key) {
                    this[key] = this.ds[key];
                }.bind(this));
            }
            LazyObject.prototype.filter = function (fn) {
                this.fn = fn;
                return this;
            };
            LazyObject.prototype.head = function () {
                var fn = this.fn;
                for (var x in this.ds) {
                    if (fn(x, this.ds) === true) {
                        return x;
                    }
                }
            };
            return LazyObject;
        }();
    LazyObject = $$770d6a;
    rx = new LazyObject({
        IDENTIFIER: /^([a-zA-Z_$][0-9a-zA-Z_\-]*)/,
        NUM: /^((\d+\.)?\d+)+/,
        STR: /^'(.*?)'/,
        LAMBDA: /^->/,
        OPERATION: /^(<\+|<=|>=|>|<|=>|(!|=)==?|\|\||\&\&|!!|\+\+|\+:)+/,
        TERMINATOR: /^\n/,
        REGEX: /^(\/((?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*)\/)([imgy]{0,4})(?!\w)/,
        COMMENTS: /^(--.*)/,
        WHITESPACE: /^ /
    });
    identifiers = new LazyObject({
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
            'object',
            'clones',
            'clone',
            'prototype',
            'recur',
            'macro'
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
        RIGHT_OPERATORS: [
            '=>',
            '+:'
        ],
        NOT: [
            'not'
        ],
        LOGIC: [
            'and',
            'or',
            '&&',
            '||'
        ],
        BOOL: [
            'true',
            'false'
        ]
    });
    ignore = {
        'COMMENTS': 'COMMENTS',
        'WHITESPACE': 'WHITESPACE'
    };
    getType = function (a) {
        return rx.filter(function (x) {
            return rx[x].test(a);
        }).head(null);
    };
    extract = function (key, chunk) {
        return rx[key].exec(chunk);
    };
    parseAlphanumeric = function (t, chunk) {
        return extract(t, chunk)[1];
    };
    returnIdentifier = function (type, item) {
        switch (false) {
        case !(type === 'KEYWORDS'):
            return [
                item.toUpperCase(),
                item
            ];
        default:
            return [
                type,
                item
            ];
        }
    };
    parseIdentifier = function (t, chunk) {
        var item, token;
        item = extract(t, chunk);
        token = identifiers.filter(function (x) {
            return identifiers[x].indexOf(item[1]) >= 0;
        }).head(null);
        return returnIdentifier(token || t, item[1]);
    };
    parseRegularExpressions = function (t, chunk) {
        var item, regexp;
        item = extract(t, chunk);
        regexp = new RegExp(item[2], item[3]);
        return [
            'REGEXP',
            regexp
        ];
    };
    getToken = function (t, chunk, n) {
        switch (false) {
        case !(t === 'IDENTIFIER'):
            return parseIdentifier(t, chunk);
        case !(t === 'NUM'):
            return parseAlphanumeric(t, chunk);
        case !(t === 'STR'):
            return parseAlphanumeric(t, chunk);
        case !(t === 'OPERATION'):
            return parseIdentifier(t, chunk);
        case !(t === 'LAMBDA'):
            return 'FN';
        case !(t === 'REGEX'):
            return parseRegularExpressions(t, chunk);
        case !(t === 'COMMENTS'):
            return parseAlphanumeric(t, chunk);
        case !(t === 'WHITESPACE'):
            return ' ';
        case !(t === 'TERMINATOR'):
            return ' ';
        default:
            return [
                chunk[0],
                chunk[0]
            ];
        }
    };
    processChunk = function (code, n) {
        var type, token;
        type = getType(code);
        token = getToken(type, code, n);
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
    getLength = function (token, i) {
        switch (false) {
        case !(token === 'STR'):
            return i + 2;
        default:
            return i;
        }
    };
    incrLine = function (type, line) {
        switch (false) {
        case !(type === 'TERMINATOR'):
            return line + 1;
        default:
            return line;
        }
    };
    returnTokens = function (code, n, tokens) {
        var token, index;
        if (tokens == null)
            tokens = [];
        while (true) {
            switch (false) {
            case !(!code):
                return tokens;
            default:
                token = processChunk(code, n);
                index = getLength(token[0], token[1].toString().length);
                tokens.push(token);
                var $$recur0 = code.substr(index, code.length);
                var $$recur1 = {
                        line: incrLine(token[0], n.line)
                    };
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