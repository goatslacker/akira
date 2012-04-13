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
      Root: [['Program', 'return $$ = $1']],
      Program: [
        o('', function() {
          return new Nodes;
        }), o('Terminator Expressions', function() {
          return $2;
        }), o('Expressions')
      ],
      Expressions: [
        o('Body', function() {
          return new Nodes($1);
        }), o('Expressions TERMINATOR Body', function() {
          return $1.push($3);
        }), o('Expressions TERMINATOR', function() {
          return new Nodes($1);
        })
      ],
      Terminator: [o('TERMINATOR'), o('Terminator TERMINATOR')],
      Identifier: [o('IDENTIFIER')],
      Body: [
        o('Expression'), o('( Expressions )', function() {
          return $2;
        }), o('( Terminator Expressions )', function() {
          return $3;
        })
      ],
      SExpression: [
        o('( Expression )', function() {
          return $2;
        })
      ],
      Expression: [o('Import'), o('Value'), o('Assignment'), o('Invocation'), o('Pipeline'), o('Declaration')],
      Value: [o('Literal'), o('Lists'), o('Operation')],
      Literal: [o('Identifier'), o('AlphaNumeric'), o('BOOL')],
      AlphaNumeric: [
        o('NUMBER', function() {
          return new Literal(Number($1));
        }), o('STRING', function() {
          return new Literal(String($1));
        })
      ],
      Assignment: [
        o('Identifier = Body', function() {
          return new Assignment($1, $3);
        })
      ],
      Import: [
        o('@ STRING', function() {
          return new Import($2);
        })
      ],
      Piped: [o('Identifier'), o('SExpression')],
      Pipeline: [
        o('Invocation | Piped', function() {
          return new Call($3, $1);
        }), o('Lists | Piped', function() {
          return new Call($3, $1);
        }), o('Pipeline | Piped', function() {
          return new Call($3, $1);
        })
      ],
      Invocation: [
        o('Identifier : Arguments', function() {
          return new Call($1, $3);
        })
      ],
      Declaration: [
        o('Identifier ( Parameters ) LAMBDA Body', function() {
          return new Declaration($1, $3, $6);
        }), o('\\ ( Parameters ) LAMBDA Body', function() {
          return new Declaration(null, $3, $6);
        })
      ],
      Lists: [
        o('[ Arguments ]', function() {
          return new List($2);
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
      Param: [
        o('Identifier'), o('_ Identifier', function() {
          return "_" + $2;
        })
      ],
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
