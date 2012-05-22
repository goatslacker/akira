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
      action = match ? match[1] : '(#{action}())';
      action = action.replace(/\bnew /g, '$&yy.');
      action = action.replace(/\b(?:Nodes\.wrap)\b/g, 'yy.$&');
      return [patternString, '$$ = ' + action + '', options];
    };
    tokens = ['ASSERT', 'ARGUMENTS', 'IF', 'THEN', 'ELSE', 'LAMBDA', 'IDENTIFIER', 'BOOL', 'NUMBER', 'STRING', 'LOGIC', 'COMPARE', 'TERMINATOR'].join(' ');
    startSymbol = 'Root';
    bnf = {
      Root: [['', 'return $$ = new yy.Nodes;'], ['Program', 'return $$ = $1']],
      Program: [
        o('Terminator Expressions', function() {
          return $2;
        }), o('Expressions')
      ],
      Expressions: [
        o('Body', function() {
          return Nodes.wrap($1);
        }), o('Expressions TERMINATOR Body', function() {
          return $1.push($3);
        }), o('Expressions TERMINATOR')
      ],
      Terminator: [o('TERMINATOR'), o('Terminator TERMINATOR')],
      OptTerminator: [o(''), o('Terminator')],
      Identifier: [o('IDENTIFIER')],
      Utils: [
        o('UTILS', function() {
          return new Utils($1);
        })
      ],
      Body: [
        o('Expression'), o('( OptTerminator Expressions )', function() {
          return $3;
        })
      ],
      SExpression: [
        o('( Expression )', function() {
          return $2;
        })
      ],
      Expression: [
        o('Modules'), o('Value'), o('If'), o('Assignment'), o('ARGUMENTS'), o('Invocation'), o('Pipeline'), o('Declaration'), o('PatternMatching'), o('JAVASCRIPT', function() {
          return new JavaScript($1);
        }), o('Construct')
      ],
      Value: [o('Literal'), o('Lists'), o('Tuples'), o('ExplicitInvocation'), o('Operation'), o('Access'), o('Utils')],
      Values: [o('Value'), o('Invocation')],
      Literal: [
        o('Identifier'), o('AlphaNumeric'), o('BOOL', function() {
          return new Literal(Boolean($1));
        }), o('REGEXP', function() {
          return new Literal($1);
        })
      ],
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
      Modules: [
        o('EXPORT Identifier', function() {
          return new Export($2);
        }), o('IMPORT STRING', function() {
          return new Import($2);
        })
      ],
      Construct: [
        o('CONSTRUCT Invocation', function() {
          return new Construction($2);
        })
      ],
      Piped: [o('Identifier'), o('Utils'), o('SExpression')],
      Pipeline: [
        o('Value | Piped', function() {
          return new Call($3, $1);
        }), o('Invocation | Piped', function() {
          return new Call($3, $1);
        }), o('Pipeline | Piped', function() {
          return new Call($3, $1);
        })
      ],
      Invocation: [
        o('Identifier : Arguments', function() {
          return new Call($1, $3);
        }), o('Utils : Arguments', function() {
          return new Call($1, $3);
        }), o('Access : Arguments', function() {
          return new Call($1, $3);
        })
      ],
      ExplicitInvocation: [
        o('Invocation ;', function() {
          return $1;
        })
      ],
      Declaration: [
        o('Identifier ( Parameters ) LAMBDA Body', function() {
          return new Declaration($1, $3, $6);
        }), o('\\ Parameters LAMBDA Body', function() {
          return new Declaration(null, $2, $4);
        }), o('LAMBDA Body', function() {
          return new Call(new Declaration(null, null, $2), null);
        })
      ],
      Pattern: [
        o('Value LAMBDA Values TERMINATOR', function() {
          return [$1, $3];
        })
      ],
      Patterns: [
        o('Pattern', function() {
          return new Arguments($1);
        }), o('Patterns Pattern', function() {
          return new Arguments($1, $2);
        })
      ],
      PatternMatching: [
        o('MATCH Identifier ( Parameters ) TERMINATOR Patterns', function() {
          return new Declaration($2, $4, new Pattern($4, $7));
        })
      ],
      Comma: [o(', OptTerminator')],
      Lists: [
        o('[ ]', function() {
          return new List;
        }), o('[ OptTerminator ListArgs OptTerminator ]', function() {
          return new List($3);
        })
      ],
      ListArgs: [
        o('( )', function() {
          return '';
        }), o('Arg', function() {
          return new Arguments($1);
        }), o('ListArgs Comma Arg', function() {
          return new Arguments($1, $3);
        }), o('ListArgs Terminator Arg', function() {
          return new Arguments($1, $3);
        })
      ],
      KeyValue: [
        o('Identifier = Value', function() {
          return new Assignment($1, $3);
        })
      ],
      TupleItems: [
        o('KeyValue', function() {
          return new Arguments($1);
        }), o('TupleItems Comma KeyValue', function() {
          return new Arguments($1, $3);
        }), o('TupleItems Terminator KeyValue', function() {
          return new Arguments($1, $3);
        })
      ],
      Tuples: [
        o('{ OptTerminator TupleItems OptTerminator }', function() {
          return new Tuple($3);
        })
      ],
      Access: [
        o('Identifier : : Literal', function() {
          return new Access($1, $4);
        })
      ],
      Arg: [o('Value'), o('SExpression'), o('ARGUMENTS')],
      Arguments: [
        o('( )', function() {
          return null;
        }), o('Arg', function() {
          return new Arguments($1);
        }), o('Arguments Comma Arg', function() {
          return new Arguments($1, $3);
        })
      ],
      Param: [o('Identifier'), o('Utils')],
      Parameters: [
        o('', function() {
          return null;
        }), o('Param', function() {
          return new Arguments($1);
        }), o('Parameters , Param', function() {
          return new Arguments($1, $3);
        })
      ],
      If: [
        o('IF Values OptTerminator THEN Body OptTerminator ELSE Body', function() {
          return new If($2, $5, $8);
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
    operators = [['right', 'IF', 'THEN', 'ELSE', 'IMPORT', 'EXPORT', 'ASSERT', 'ARGUMENTS'], ['right', '=', '|'], ['nonassoc', '(', ')', '[', ']', '{', '}'], ['left', 'LOGIC'], ['left', 'COMPARE'], ['left', '+', '-'], ['left', '*', '/']];
    return {
      tokens: tokens,
      bnf: bnf,
      operators: operators,
      startSymbol: startSymbol
    };
  })());

  fs.writeFileSync('./lib/parser.js', parser.generate(), 'utf8');

}).call(this);
