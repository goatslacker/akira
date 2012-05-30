(function () {
function partial(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var args_ = Array.prototype.slice.call(arguments, 0);
        return f.apply(f, args.concat(args_));
    };
}
function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
function call(obj, prop) {
    var args = Array.prototype.slice.call(arguments, 2);
    return obj[prop].apply(obj, args);
}
function get(obj, prop) {
    return obj[prop];
}
function pop(list) {
    return list.pop();
}
function neq(a, b) {
    return a !== b;
}
function length(list) {
    return list.length;
}
function eq(a, b) {
    return a === b;
}
var rx, identifiers;
rx = {
    IDENTIFIER: /^([a-zA-Z_$][0-9a-zA-Z_\-$]*)/,
    NUMBER: /^((\d+\.)?\d+)+/,
    STRING: /^'(.*?)'/,
    LAMBDA: /^->/,
    OPERATION: /^(<=|>=|>|<|==|!=|\|\||\&\&|≤|≥)+/,
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
        'catch'
    ],
    COMPARE: [
        '==',
        '!=',
        '>',
        '>=',
        '<',
        '<=',
        'is',
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
    ],
    UTILS: [
        'arrEq',
        'assert',
        'at',
        'call',
        'consts',
        'div',
        'eq',
        'filter',
        'flip',
        'foldl',
        'foldr',
        'get',
        'head',
        'init',
        'last',
        'length',
        'map',
        'mod',
        'neq',
        'partial',
        'pop',
        'print',
        'prod',
        'raise',
        'range',
        'sub',
        'sum',
        'square',
        'tail'
    ]
};
var filterTokensFn = function filterTokensFn(a) {
    return partial(filter, function (x) {
        return call(get(rx, x), 'test', a);
    });
};
var getType = function getType(a) {
    var filterTokens;
    filterTokens = filterTokensFn(a);
    return pop(filterTokens(Object.keys(rx)));
};
var extract = function extract(key, chunk) {
    return call(get(rx, key), 'exec', chunk);
};
var parseAlphanumeric = function parseAlphanumeric(t, chunk) {
    var exec;
    exec = extract(t, chunk);
    return exec[1];
};
var filterIdentifiersFn = function filterIdentifiersFn(iden) {
    return partial(filter, function (x) {
        return neq(0 - 1, call(get(identifiers, x), 'indexOf', iden));
    });
};
var returnIdentifier = function returnIdentifier(item, type) {
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
var parseIdentifier = function parseIdentifier(t, chunk) {
    var item, filterIdentifiers, token;
    item = extract(t, chunk);
    filterIdentifiers = filterIdentifiersFn(item[1]);
    token = pop(filterIdentifiers(Object.keys(identifiers)));
    return returnIdentifier(item[1], token || t);
};
var parseRegularExpressions = function parseRegularExpressions(t, chunk) {
    var item, regexp;
    item = extract(t, chunk);
    regexp = new RegExp(item[2], item[3]);
    return [
        'REGEXP',
        regexp
    ];
};
var getToken = function getToken(chunk, t) {
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
var processChunk = function processChunk(code, line) {
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
var getLength = function getLength(i, len, type) {
    switch (false) {
    case !(type === 'STRING'):
        return i + len + 2;
    default:
        return i + len;
    }
};
var incrLine = function incrLine(line, type) {
    switch (false) {
    case !(type === 'TERMINATOR'):
        return line + 1;
    default:
        return line;
    }
};
var returnTokens = function returnTokens(code, i, line) {
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
var tokenize = function tokenize(code) {
    var ignore;
    ignore = [
        'COMMENTS',
        'WHITESPACE'
    ];
    return filter(function (token) {
        return eq(0 - 1, ignore.indexOf(token[0]));
    }, returnTokens(code, 0, 1));
};
this.tokenize = tokenize;
}.call(typeof module !== "undefined" ? module.exports : this))
