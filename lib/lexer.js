/*global module */

var Lexer = (function () {

  var rx = {
    token: /^([a-zA-Z_$][0-9a-zA-Z_\-$]*)/,
    number: /^((\d+\.)?\d+)+/,
    string: /^'(.*?)'/,
    lambda: /^->/,
    operation: /^(<=|>=|>|<|==|!=|\|\||\&\&|≤|≥)+/,
    newline: /^\n/,
    regex: /^(\/((?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*)\/)([imgy]{0,4})(?!\w)/,
    javascriptStart: /^<%/,
    javascriptEnd: /^%>/,
    comments: /^#/,
    whitespace: /^ /
  };

  var KEYWORDS = ['arguments', 'construct', 'if', 'then', 'else', 'import', 'export', 'match'];

  var UTILS = [
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
    'print',
    'prod',
    'range',
    'sub',
    'sum',
    'square',
    'tail'
  ];

  var COMPARE = ["==", "!=", ">", ">=", "<", "<=", "is", "not", "≤", "≥"];
  var LOGIC = ["and", "or", "&&", "||"];
  var BOOLEAN = ["true", "false"];

  var $ = {};

  $.tokenize = function (code) {
    // Cleanup code by removing extra space
    code.trim();

    // pointer
    var i = 0;

    // collection of parsed tokens
    var tokens = [];

    var jsMode = false;

    // the item which we found
    var item = "";

    // current line number
    var line_no = 0;

    // current chunk of code
    var chunk = "";

    // scan each character until we find something to parse
    while (i < code.length) {
      // grabs the remaining chunk of code
      chunk = code.substr(i, code.length);

      if (jsMode === true) {

        var jsLineNo = line_no;

        if (rx.newline.test(chunk)) {
          line_no += 1;
        }

        if (rx.javascriptEnd.test(chunk)) {
          jsMode = false;
          tokens.push(["JAVASCRIPT", item, jsLineNo]);
          i += 1;
        }

        item += chunk[0];
        i += 1;

      // matches tokens
      } else if (rx.token.test(chunk)) {
        item = rx.token.exec(chunk)[1];

        // is a keyword
        if (KEYWORDS.indexOf(item) !== -1) {
          tokens.push([item.toUpperCase(), item, line_no]);

        } else if (UTILS.indexOf(item) !== -1) {
          tokens.push(["UTILS", item, line_no]);

        // logical operator
        } else if (LOGIC.indexOf(item) !== -1) {
          tokens.push(["LOGIC", item, line_no]);

        } else if (BOOLEAN.indexOf(item) !== -1) {
          tokens.push(["BOOL", item, line_no]);

        // is an identifier
        } else {
          tokens.push(["IDENTIFIER", item, line_no]);
        }

        i += item.length;

      // matches js
      } else if (rx.javascriptStart.test(chunk)) {
        jsMode = true;
        item = '';
        i += 2;

      // matches numbers
      } else if (rx.number.test(chunk)) {
        item = rx.number.exec(chunk)[1];
        tokens.push(["NUMBER", item, line_no]);
        i += item.length;

      // matches strings
      } else if (rx.string.test(chunk)) {
        item = rx.string.exec(chunk)[1];
        tokens.push(["STRING", item, line_no]);
        i += item.length + 2;

      } else if (rx.lambda.test(chunk)) {
        tokens.push(["LAMBDA", "->", line_no]);
        i += 2;

      // operations
      } else if (rx.operation.test(chunk)) {
        item = rx.operation.exec(chunk)[1];

        if (COMPARE.indexOf(item) !== -1) {
          tokens.push(["COMPARE", item, line_no]);
        } else if (LOGIC.indexOf(item) !== -1) {
          tokens.push(["LOGIC", item, line_no]);
        } else {
          tokens.push([item, item, line_no]);
        }

        i += item.length;

      } else if (rx.comments.test(chunk)) {
        i += chunk.indexOf('\n') + 1;
        line_no += 1;

      } else if (rx.regex.test(chunk)) {
        item = rx.regex.exec(chunk);
        tokens.push(["REGEXP", new RegExp(item[2], item[3]), line_no]);
        i += item[0].length;

      // newlines
      } else if (rx.newline.test(chunk)) {
        tokens.push(["TERMINATOR", "\n", line_no]);
        line_no += 1;
        i += 1;

      // ignore whitespace
      } else if (rx.whitespace.test(chunk)) {
        i += 1;

      } else {
        // nothing matched
        tokens.push([chunk[0], chunk[0], line_no]);
        i += 1;
      }
    }

    return tokens;
  };

  return $;
}());

module.exports = Lexer;
