(function () {
  var r = this;
  var List = Array.prototype;

  r.date = function () {
    return Date.now();
  };

  r.print = function () {
    var args = List.slice.call(arguments, 0);
    console.log.apply(console, args);
    return args;
  };

  r.mod = function (a, b) {
    return a % b;
  };

  r.length = function (list) {
    return list.length;
  };

  r.at = function (list, index) {
    return list[index - 1];
  };

  r.get = function (obj, prop) {
    return obj[prop];
  };

  r.call = function (obj, prop) {
    var args = List.slice.call(arguments, 2);
    return obj[prop].apply(obj, args);
  };

  r.push = function (list, el) {
    list.push(el);
    return list;
  };

  r.filter = function (fn, list) {
    return List.filter.call(list, function (node, index, list) {
      return fn(node, index + 1, list);
    });
  };

  r.map = function (fn, list) {
    return List.map.call(list, function (node, index, list) {
      return fn(node, index + 1, list);
    });
  };

  r.foldl = function (fn, list) {
    return List.reduce.call(list, fn);
  };

  r.foldr = function (fn, list) {
    return List.reduceRight.call(list, fn);
  };

  r.range = function (a, b, fn) {
    var list = [];
    for (var i = a; i <= b; i += 1) {
      list.push(fn ? fn(i) : i);
    }
    return list;
  };

  r.regexp = function (regexp, opts) {
    return new RegExp(regexp, opts);
  };

}.call(global));

var TOKEN = regexp('^([a-zA-Z]+)');
var number = regexp('^(\\d*\\.?\\d+)+');
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
var tokenize = function tokenize(code, lineNo) {
    var tokens = [];
    var len = length(code);
    if (len == 0) {
        return tokens;
    } else {
        var isToken = call(TOKEN, 'test', code);
        if (isToken == true) {
            var item = at(call(TOKEN, 'exec'), 2);
            var token = processToken(item, lineNo);
            if (token) {
                var i = length(token);
                push(tokens, token);
            } else {
                tokens;
            }
        } else {
            tokens;
        }
        var i = 1;
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

module.exports = Lexer;
