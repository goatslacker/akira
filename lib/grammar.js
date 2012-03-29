(function() {
  var Parser, fs, parser;

  fs = require('fs');

  Parser = require('jison').Parser;

  parser = new Parser((function() {
    var bnf, o, operators, startSymbol, tokens, unwrap;
    unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*)\s*\}/;
    o = function(patternString, action, options) {
      var match;
      patternString = patternString.replace(/\s{2,}/g, ' ');
      if (!action) return [patternString, '$$ = $1', options];
      match = unwrap.exec(action);
      action = match ? match[1] : "(" + action + "())";
      action = action.replace(/\bnew /g, '$&yy.');
      action = action.replace(/\b(?:Nodes\.add)\b/g, 'yy.$&');
      return [patternString, "$$ = " + action + "", options];
    };
    tokens = ["ASSERT", "LAMBDA", "BOOL", "CASE", "COMPARE", "DEFAULT", "ELSE", "FN", "IDENTIFIER", "IF", "LOGIC", "NUMBER", "PRINT", "RETURN", "STRING", "TERMINATOR", "WHILE"].join(" ");
    startSymbol = 'Root';
    bnf = {
      Root: [['Expressions', 'return $$ = $1']],
      Expressions: [
        o('Expression', function() {
          return new Nodes($1);
        }), o('Expressions TERMINATOR Expression', function() {
          return $1.push($3);
        }), o('Expressions TERMINATOR', function() {
          return new Nodes($1);
        })
      ],
      Terminator: [o('TERMINATOR'), o('Terminator TERMINATOR')],
      Identifier: [o('IDENTIFIER')],
      Expression: [o('Literal'), o('Invocation'), o('Assignment'), o('Declaration'), o('Operation')],
      Statement: [o('Return')],
      Literal: [o('Identifier'), o('AlphaNumeric'), o('BOOL')],
      AlphaNumeric: [
        o('NUMBER', function() {
          return new Literal(Number($1));
        }), o('STRING', function() {
          return new Literal(String($1));
        })
      ],
      Assignment: [
        o('Identifier = Expression', function() {
          return new Assignment($1, $3);
        })
      ],
      Invocation: [
        o('Identifier ( Arguments )', function() {
          return new Call($1, $3);
        }), o('PRINT ( Arguments )', function() {
          return new Call('print', $3);
        })
      ],
      Declaration: [
        o('Identifier LAMBDA Parameters = Expression', function() {
          return new Declaration($1, $3, $5);
        })
      ],
      Arguments: [
        o('', function() {
          return null;
        }), o('Expression', function() {
          return new Arguments($1);
        }), o('Arguments , Expression', function() {
          return new Arguments($1, $3);
        })
      ],
      Parameters: [
        o('', function() {
          return null;
        }), o('Identifier', function() {
          return new Arguments($1);
        }), o('Parameters , Identifier', function() {
          return new Arguments($1, $3);
        }), o('( Parameters )', function() {
          return new Arguments($2);
        })
      ],
      Operation: [
        o('Expression COMPARE Expression', function() {
          return new Compare($1, $2, $3);
        }), o('Expression LOGIC Expression', function() {
          return new Compare($1, $2, $3);
        }), o('Expression + Expression', function() {
          return new Operation($1, '+', $3);
        }), o('Expression - Expression', function() {
          return new Operation($1, '-', $3);
        }), o('Expression * Expression', function() {
          return new Operation($1, '*', $3);
        }), o('Expression / Expression', function() {
          return new Operation($1, '/', $3);
        }), o('( Expression )', function() {
          return $2;
        })
      ],
      Block: [
        o('{ }', function() {
          return null;
        }), o('{ Expressions }', function() {
          return $2;
        }), o('{ Terinator Expressions }', function() {
          return $3;
        })
      ]
    };
    operators = [['right', '=', 'RETURN', 'PRINT'], ['nonassoc', '{', '}'], ['left', 'LOGIC'], ['left', 'COMPARE'], ['left', '+', '-'], ['left', '*', '/'], ['left', ':'], ['left', '.']];
    return {
      tokens: tokens,
      bnf: bnf,
      operators: operators,
      startSymbol: startSymbol
    };
  })());

  fs.writeFileSync('./lib/parser.js', parser.generate(), 'utf8');

  /*
      // Logical operations, comparisons and math.
      Operation: [
      ],
  */

}).call(this);
