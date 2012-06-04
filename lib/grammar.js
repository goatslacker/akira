(function () {
var fs, jison, unwrap, getMatch, addYY, o, bnf, tokens, operators, Parser, grammar, parser;
fs = require('fs');
jison = require('jison');
unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*)\s*\}/;
getMatch = function getMatch(action) {
    var x;
    x = unwrap.exec(action);
    if (x) {
        return x[1];
    } else {
        return '('.concat(action).concat('())');
    }
};
addYY = function addYY(str) {
    return str.replace(/new /g, 'new yy.');
};
o = function o(pattern, action) {
    var patternString, newaction;
    patternString = pattern.replace(/\s{2,}/g, ' ');
    if (!action) {
        return [
            patternString,
            '$$ = $1'
        ];
    } else {
        newaction = addYY(getMatch(action));
        return [
            patternString,
            '$$ = '.concat(newaction)
        ];
    }
};
bnf = {
    Root: [
        [
            '',
            'return $$ = new yy.Nodes;'
        ],
        [
            'Program',
            'return $$ = $1'
        ]
    ],
    Program: [
        o('Terminator Expressions', function () {
            return $2;
        }),
        o('Expressions')
    ],
    Expressions: [
        o('Body', function () {
            return yy.Nodes.wrap($1);
        }),
        o('Expressions TERMINATOR Body', function () {
            return $1.push($3);
        }),
        o('Expressions TERMINATOR')
    ],
    Terminator: [
        o('TERMINATOR'),
        o('Terminator TERMINATOR')
    ],
    OptTerminator: [
        o(''),
        o('Terminator')
    ],
    Identifier: [
        o('IDENTIFIER', function () {
            return new Identifier($1);
        })
    ],
    IdentifierNoUtils: [
        o('IDENTIFIER', function () {
            return new Identifier($1, true);
        })
    ],
    Body: [
        o('Expression'),
        o('( OptTerminator Expressions )', function () {
            return $3;
        })
    ],
    SExpression: [
        o('( Assignable )', function () {
            return $2;
        }),
        o('( Declaration )', function () {
            return $2;
        })
    ],
    Expression: [
        o('Modules'),
        o('Assignable'),
        o('ARGUMENTS'),
        o('Declaration'),
        o('PatternMatching'),
        o('Exceptions')
    ],
    Assignable: [
        o('Value'),
        o('If'),
        o('Assignment'),
        o('Invocation'),
        o('Pipeline'),
        o('Construct')
    ],
    Value: [
        o('Literal'),
        o('Lists'),
        o('Tuples'),
        o('ExplicitInvocation'),
        o('Operation'),
        o('Access'),
        o('@')
    ],
    Values: [
        o('Value'),
        o('Invocation')
    ],
    Literal: [
        o('Identifier'),
        o('AlphaNumeric'),
        o('NONE', function () {
            return new Literal(null);
        }),
        o('BOOL', function () {
            return new Literal($1 === 'true');
        }),
        o('REGEXP', function () {
            return new Literal($1);
        })
    ],
    AlphaNumeric: [
        o('NUMBER', function () {
            return new Literal(Number($1));
        }),
        o('STRING', function () {
            return new Literal(String($1));
        })
    ],
    Assignment: [
        o('Identifier = Assignable', function () {
            return new Assignment($1, $3);
        })
    ],
    Exported: [
        o('Identifier'),
        o('Declaration'),
        o('Assignment')
    ],
    Modules: [
        o('EXPORT Exported', function () {
            return new Export($2);
        }),
        o('IMPORT STRING', function () {
            return new Import($2);
        })
    ],
    Construct: [
        o('CONSTRUCT Invocation', function () {
            return new Construction($2);
        })
    ],
    Piped: [
        o('Values'),
        o('SExpression')
    ],
    Pipeline: [
        o('Value | Piped', function () {
            return new Pipeline($1, $3);
        }),
        o('Invocation | Piped', function () {
            return new Pipeline($1, $3);
        }),
        o('Construct | Piped', function () {
            return new Pipeline($1, $3);
        }),
        o('Pipeline | Piped', function () {
            return new Pipeline($1, $3);
        })
    ],
    Invocation: [
        o('Identifier : Arguments', function () {
            return new Call($1, $3);
        }),
        o('Access : Arguments', function () {
            return new Call($1, $3);
        })
    ],
    ExplicitInvocation: [
        o('Invocation ;', function () {
            return $1;
        })
    ],
    Declaration: [
        o('Identifier ( Parameters ) LAMBDA Body', function () {
            return new Declaration($1, $3, $6);
        }),
        o('\\ Parameters LAMBDA Body', function () {
            return new Declaration(null, $2, $4);
        }),
        o('LAMBDA Body', function () {
            return new Call(new Declaration(null, null, $2), null);
        })
    ],
    Pattern: [
        o('Value LAMBDA Body TERMINATOR', function () {
            return [
                $1,
                $3
            ];
        })
    ],
    Patterns: [
        o('Pattern', function () {
            return new Arguments($1);
        }),
        o('Patterns Pattern', function () {
            return new Arguments($1, $2);
        })
    ],
    PatternMatching: [
        o('Identifier ( Parameters ) TERMINATOR Patterns', function () {
            return new Declaration($1, $3, new Pattern($3, $6));
        })
    ],
    Comma: [
        o(', OptTerminator')
    ],
    Lists: [
        o('[ ]', function () {
            return new List();
        }),
        o('[ OptTerminator ListArgs OptTerminator ]', function () {
            return new List($3);
        })
    ],
    ListArgs: [
        o('Arg', function () {
            return new Arguments($1);
        }),
        o('ListArgs Comma Arg', function () {
            return new Arguments($1, $3);
        }),
        o('ListArgs Terminator Arg', function () {
            return new Arguments($1, $3);
        })
    ],
    KeyValue: [
        o('IdentifierNoUtils = Value', function () {
            return new Assignment($1, $3);
        })
    ],
    TupleItems: [
        o('KeyValue', function () {
            return new Arguments($1);
        }),
        o('TupleItems Comma KeyValue', function () {
            return new Arguments($1, $3);
        }),
        o('TupleItems Terminator KeyValue', function () {
            return new Arguments($1, $3);
        })
    ],
    Tuples: [
        o('{ }', function () {
            return new Tuple();
        }),
        o('{ OptTerminator TupleItems OptTerminator }', function () {
            return new Tuple($3);
        })
    ],
    Access: [
        o('Identifier Accessor', function () {
            return new Access($1, $2);
        }),
        o('ExplicitInvocation Accessor', function () {
            return new Access($1, $2);
        }),
        o('Access Accessor', function () {
            return new Access($1, $2);
        })
    ],
    Accessor: [
        o('. IdentifierNoUtils', function () {
            return $2;
        }),
        o('. AlphaNumeric', function () {
            return $2;
        })
    ],
    Arg: [
        o('Value'),
        o('SExpression'),
        o('ARGUMENTS')
    ],
    Arguments: [
        o('!', function () {
            return null;
        }),
        o('Arg', function () {
            return new Arguments($1);
        }),
        o('Arguments Comma Arg', function () {
            return new Arguments($1, $3);
        })
    ],
    Param: [
        o('Identifier'),
        o('Identifier = Value', function () {
            return new Assignment($1, $3);
        }),
        o('Lists')
    ],
    Parameters: [
        o('', function () {
            return null;
        }),
        o('Param', function () {
            return new Arguments($1);
        }),
        o('Parameters , Param', function () {
            return new Arguments($1, $3);
        })
    ],
    Exceptions: [
        o('TRY Body CATCH Body', function () {
            return new Exception($2, $4);
        })
    ],
    If: [
        o('IF Values OptTerminator THEN Body OptTerminator ELSE Body', function () {
            return new If($2, $5, $8);
        })
    ],
    Operation: [
        o('Value COMPARE Value', function () {
            return new Compare($1, $2, $3);
        }),
        o('Value LOGIC Value', function () {
            return new Compare($1, $2, $3);
        }),
        o('Value OPERATORS Value', function () {
            return new Operation($1, $2, $3);
        }),
        o('NOT Value', function () {
            return new Compare($2, $1);
        }),
        o('Value + Value', function () {
            return new Operation($1, '+', $3);
        }),
        o('Value - Value', function () {
            return new Operation($1, '-', $3);
        }),
        o('Value * Value', function () {
            return new Operation($1, '*', $3);
        }),
        o('Value / Value', function () {
            return new Operation($1, '/', $3);
        })
    ]
};
tokens = [
    'ASSERT',
    'ARGUMENTS',
    'IF',
    'THEN',
    'ELSE',
    'LAMBDA',
    'IDENTIFIER',
    'BOOL',
    'NUMBER',
    'STRING',
    'LOGIC',
    'COMPARE',
    'TERMINATOR'
];
operators = [
    [
        'right',
        'NOT'
    ],
    [
        'right',
        'IF',
        'THEN',
        'ELSE',
        'IMPORT',
        'EXPORT',
        'ASSERT',
        'ARGUMENTS'
    ],
    [
        'right',
        '=',
        '|'
    ],
    [
        'nonassoc',
        '(',
        ')',
        '[',
        ']',
        '{',
        '}',
        ':'
    ],
    [
        'left',
        'LOGIC'
    ],
    [
        'left',
        'COMPARE'
    ],
    [
        'left',
        'OPERATORS'
    ],
    [
        'left',
        '+',
        '-'
    ],
    [
        'left',
        '*',
        '/'
    ]
];
Parser = jison.Parser;
grammar = {
    tokens: tokens,
    bnf: bnf,
    operators: operators,
    startSymbol: 'Root'
};
parser = new Parser(grammar);
fs.writeFileSync('./lib/parser.js', parser.generate(), 'utf8');
}.call(typeof module !== "undefined" ? module.exports : this))
