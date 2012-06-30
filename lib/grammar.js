(function () {
var merge = function merge(base, obj) {
    Object.keys(obj).forEach(function (key) {
        base[key] = obj[key];
    });
};
var jison, unwrap, getMatch, addYY, o, bnf, tokens, operators, Parser, grammar, parser, lexer;
jison = require('jison');
unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*)\s*\}/;
getMatch = function (action) {
    var x;
    x = unwrap.exec(action);
    if (x) {
        return x[1];
    } else {
        return '('.concat(action, '())');
    }
};
addYY = function (str) {
    return str.replace(/new /g, 'new yy.');
};
o = function (pattern, action) {
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
    Rest: [
        o('. . . IDENTIFIER', function () {
            return new Identifier($4, false, true);
        })
    ],
    Body: [
        o('Expression'),
        o('{ OptTerminator Expressions }', function () {
            return $3;
        })
    ],
    Expression: [
        o('Modules'),
        o('Assignable'),
        o('Exceptions'),
        o('ARGUMENTS')
    ],
    Assignable: [
        o('Value'),
        o('If'),
        o('Assignment'),
        o('Declaration'),
        o('PatternMatching'),
        o('Invocation'),
        o('Pipeline'),
        o('Construct')
    ],
    Value: [
        o('Literal'),
        o('Lists'),
        o('Tuples'),
        o('Operation'),
        o('Access'),
        o('@'),
        o('( Assignable )', function () {
            return $2;
        })
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
    Modules: [
        o('EXPORT Value', function () {
            return new Export($2);
        }),
        o('EXPORT Assignment', function () {
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
    Pipeline: [
        o('Value | Values', function () {
            return new Pipeline($1, $3);
        }),
        o('Invocation | Values', function () {
            return new Pipeline($1, $3);
        }),
        o('Pipeline | Values', function () {
            return new Pipeline($1, $3);
        })
    ],
    Invocation: [
        o('Value : Arguments', function () {
            return new Call($1, $3);
        })
    ],
    Declaration: [
        o('\\ Parameters LAMBDA Expression', function () {
            return new Declaration(null, $2, $4);
        }),
        o('\\ Parameters Body', function () {
            return new Declaration(null, $2, $3);
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
    Default: [
        o('ELSE LAMBDA Body TERMINATOR', function () {
            return new Arguments([
                $1,
                $3
            ]);
        })
    ],
    PatternMatching: [
        o('\\ Parameters TERMINATOR Patterns Default', function () {
            return new Declaration(null, $2, new Pattern($2, $4, $5));
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
        o('( { } )', function () {
            return new Tuple();
        }),
        o('( { OptTerminator TupleItems OptTerminator } )', function () {
            return new Tuple($4);
        })
    ],
    Access: [
        o('Identifier Accessor', function () {
            return new Access($1, $2);
        }),
        o('@ Accessor', function () {
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
        o('MathOperators'),
        o('ARGUMENTS'),
        o('Rest')
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
        o('IdentifierNoUtils'),
        o('IdentifierNoUtils = Value', function () {
            return new Assignment($1, $3);
        }),
        o('Rest'),
        o('Lists')
    ],
    Parameters: [
        o('NONE', function () {
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
        o('TRY Body OptTerminator CATCH Body', function () {
            return new Exception($2, $5);
        })
    ],
    If: [
        o('IF Values OptTerminator THEN Body OptTerminator ELSE Body', function () {
            return new If($2, $5, $8);
        })
    ],
    MathOperators: [
        o('+', function () {
            return new Identifier('_add');
        }),
        o('-', function () {
            return new Identifier('_sub');
        }),
        o('*', function () {
            return new Identifier('_mul');
        }),
        o('/', function () {
            return new Identifier('_div');
        }),
        o('( MathOperators NUMBER )', function () {
            return new Call(new Call(new Identifier('curryr'), new Arguments($2)), new Arguments($3));
        })
    ],
    Operation: [
        o('Value COMPARE Value', function () {
            return new Compare($1, $2, $3);
        }),
        o('Value LOGIC Value', function () {
            return new Compare($1, $2, $3);
        }),
        o('Value LEFT_OPERATORS Value', function () {
            return new Operation($1, $2, $3);
        }),
        o('Value RIGHT_OPERATORS Value', function () {
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
        'right',
        'RIGHT_OPERATORS'
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
        'LEFT_OPERATORS'
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
this.parser = parser = new Parser(grammar);
lexer = {
    lex: function () {
        var ref;
        ref = this.tokens[this.pos] || [
            ''
        ];
        merge(this, {
            pos: this.pos + 1,
            yytext: ref[1],
            yylineno: ref[2]
        });
        return ref[0];
    },
    setInput: function (tokens) {
        return merge(this, {
            tokens: tokens,
            pos: 0
        });
    }
};
merge(parser, {
    lexer: lexer
});
}.call(typeof module !== "undefined" ? module.exports : this))