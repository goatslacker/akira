(function () {
function last($$list) {
    var $$offset = 0, _ = $$list.slice(0, $$offset = $$list.length - 1), x = $$list[$$offset];
    return x;
}
function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
function partial(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var args_ = Array.prototype.slice.call(arguments, 0);
        return f.apply(f, args.concat(args_));
    };
}
function length(of) {
    return of.length;
}
var rx, identifiers, ignore, getType, extract, parseAlphanumeric, filterIdentifiersFn, returnIdentifier, parseIdentifier, parseRegularExpressions, getToken, processChunk, getLength, incrLine, returnTokens, tokenize;
rx = {
    IDENTIFIER: /^([a-zA-Z_$][0-9a-zA-Z_\-]*)/,
    NUMBER: /^((\d+\.)?\d+)+/,
    STRING: /^'(.*?)'/,
    LAMBDA: /^->/,
    OPERATION: /^(<\+|<=|>=|>|<|=>|(!|=)==?|\|\||\&\&|!!|\+\+|\+:)+/,
    TERMINATOR: /^\n/,
    REGEX: /^(\/((?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*)\/)([imgy]{0,4})(?!\w)/,
    COMMENTS: /^(#.*)/,
    WHITESPACE: /^ /
};
identifiers = {
    KEYWORDS: [
        'arguments',
        'construct',
        'if',
        'then',
        'else',
        'import',
        'export',
        'try',
        'catch',
        'none'
    ],
    COMPARE: [
        '===',
        '!==',
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
        '!!',
        '<+'
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
};
ignore = [
    'COMMENTS',
    'WHITESPACE'
];
getType = function getType(a) {
    return last(filter(function (x) {
        return rx[x].test(a);
    }, Object.keys(rx)));
};
extract = function extract(key, chunk) {
    return rx[key].exec(chunk);
};
parseAlphanumeric = function parseAlphanumeric(t, chunk) {
    return extract(t, chunk)[1];
};
filterIdentifiersFn = function filterIdentifiersFn(iden) {
    return partial(filter, function (x) {
        return identifiers[x].indexOf(iden) >= 0;
    });
};
returnIdentifier = function returnIdentifier(item, type) {
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
parseIdentifier = function parseIdentifier(t, chunk) {
    var item, filterIdentifiers, token;
    item = extract(t, chunk);
    filterIdentifiers = filterIdentifiersFn(item[1]);
    token = last(filterIdentifiers(Object.keys(identifiers)));
    return returnIdentifier(item[1], token || t);
};
parseRegularExpressions = function parseRegularExpressions(t, chunk) {
    var item, regexp;
    item = extract(t, chunk);
    regexp = new RegExp(item[2], item[3]);
    return [
        'REGEXP',
        regexp
    ];
};
getToken = function getToken(chunk, t) {
    switch (false) {
    case !(t === 'IDENTIFIER'):
        return parseIdentifier(t, chunk);
    case !(t === 'NUMBER'):
        return parseAlphanumeric(t, chunk);
    case !(t === 'STRING'):
        return parseAlphanumeric(t, chunk);
    case !(t === 'OPERATION'):
        return parseIdentifier(t, chunk);
    case !(t === 'LAMBDA'):
        return '->';
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
processChunk = function processChunk(code, line) {
    var type, token;
    type = getType(code);
    token = getToken(code, type);
    if (Array.isArray(token)) {
        token.push(line);
        return token;
    } else {
        return [
            type,
            token,
            line
        ];
    }
};
getLength = function getLength(i, len, type) {
    switch (false) {
    case !(type === 'STRING'):
        return i + len + 2;
    default:
        return i + len;
    }
};
incrLine = function incrLine(line, type) {
    switch (false) {
    case !(type === 'TERMINATOR'):
        return line + 1;
    default:
        return line;
    }
};
returnTokens = function returnTokens(code, i, line) {
    var tokens, len, chunk, token;
    tokens = [];
    len = length(code);
    chunk = code.substr(i, len);
    if (chunk) {
        token = processChunk(chunk, line);
        tokens.push(token);
        return tokens.concat(returnTokens(code, getLength(i, length(token[1].toString()), token[0]), incrLine(line, token[0])));
    } else {
        return tokens;
    }
};
this.tokenize = tokenize = function tokenize(code) {
    return filter(function (token) {
        return 0 > ignore.indexOf(token[0]);
    }, returnTokens(code, 0, 1));
};
}.call(typeof module !== "undefined" ? module.exports : this))