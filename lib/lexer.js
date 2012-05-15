/*global module */

var Lexer = (function () {

  var rx = {
    token: /^([a-zA-Z]+)/,
    number: /^(\d*\.?\d+)+/,
    string: /^'(.*?)'/,
    func: /^ƒ/,
    ret: /^«/,
    lambda: /^->/,
    operation: /^(<=|>=|>|<|==|!=|\|\||\&\&|≤|≥)+/,
    newline: /^\n/,
    comments: /^#/,
    whitespace: /^ /
  };

  var KEYWORDS = ['if', 'then', 'else', 'import', 'export'];

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

      // matches tokens
      if (rx.token.test(chunk)) {
        item = rx.token.exec(chunk)[1];

        // is a keyword
        if (KEYWORDS.indexOf(item) !== -1) {
          tokens.push([item.toUpperCase(), item, line_no]);

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

      } else if (rx.func.test(chunk)) {
        tokens.push(["FN", "ƒ", line_no]);
        i += 1;

      } else if (rx.ret.test(chunk)) {
        tokens.push(["RETURN", "RETURN", line_no]);
        i += 1;

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
