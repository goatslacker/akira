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
    tokens = ["ASSERT", "LAMBDA", "BOOL", "COMPARE", "DEFAULT", "IDENTIFIER", "LOGIC", "NUMBER", "STRING", "TERMINATOR"].join(" ");
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
      Expression: [o('Import'), o('Value'), o('Assignment'), o('Invocation'), o('Pipeline'), o('Lists'), o('Declaration'), o('_')],
      Value: [o('Literal'), o('Operation')],
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
      Import: [
        o('@ STRING', function() {
          return new Import($2);
        })
      ],
      Pipeline: [
        o('Invocation | Identifier', function() {
          return new Call($3, $1);
        }), o('Lists | Identifier', function() {
          return new Call($3, $1);
        }), o('Pipeline | Identifier', function() {
          return new Call($3, $1);
        })
      ],
      Invocation: [
        o('Identifier : Arguments', function() {
          return new Call($1, $3);
        })
      ],
      Declaration: [
        o('Identifier ( Parameters ) LAMBDA Expression', function() {
          return new Declaration($1, $3, $6);
        }), o('Identifier LAMBDA Expression', function() {
          return new Declaration($1, null, $3);
        }), o('Identifier ( Parameters ) LAMBDA Block', function() {
          return new Declaration($1, $3, $6);
        }), o('Identifier LAMBDA Block', function() {
          return new Declaration($1, null, $3);
        })
      ],
      Lists: [
        o('[ Arguments ]', function() {
          return new Arguments($2);
        })
      ],
      Arguments: [
        o('( )', function() {
          return null;
        }), o('Value', function() {
          return new Arguments($1);
        }), o('Arguments , Value', function() {
          return new Arguments($1, $3);
        })
      ],
      Param: [o('Identifier'), o('_')],
      Parameters: [
        o('', function() {
          return null;
        }), o('Param', function() {
          return new Arguments($1);
        }), o('Parameters , Param', function() {
          return new Arguments($1, $3);
        })
      ],
      Operation: [
        o('Value COMPARE Value', function() {
          return new Compare($1, $2, $3);
        }), o('Value LOGIC Value', function() {
          return new Compare($1, $2, $3);
        }), o('Value + Value', function() {
          return new Operation($1, '+', $3);
        }), o('Value - Value', function() {
          return new Operation($1, '-', $3);
        }), o('Value * Value', function() {
          return new Operation($1, '*', $3);
        }), o('Value / Value', function() {
          return new Operation($1, '/', $3);
        })
      ],
      Block: [
        o('( )', function() {
          return null;
        }), o('( Expressions )', function() {
          return $2;
        }), o('( Terminator Expressions )', function() {
          return $3;
        })
      ]
    };
    operators = [['right', '=', '|', '[', ']'], ['nonassoc', '(', ')', 'LAMBDA'], ['left', 'LOGIC'], ['left', 'COMPARE'], ['left', '+', '-'], ['left', '*', '/']];
    return {
      tokens: tokens,
      bnf: bnf,
      operators: operators,
      startSymbol: startSymbol
    };
  })());

  fs.writeFileSync('./lib/parser.js', parser.generate(), 'utf8');

}).call(this);
