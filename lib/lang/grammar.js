module.exports = (function ($$export) {
    var jison, unwrap, getMatch, addYY, addLine, o, startSymbol, bnf, tokens, operators, parser;
    jison = require('jison');
    unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*)\s*\}/;
    getMatch = function (action) {
        var x;
        x = unwrap.exec(action);
        if (x) {
            return x[1];
        } else {
            return '(' + (action) + '())';
        }
    };
    addYY = function (str) {
        return str.replace(/new /g, 'new yy.');
    };
    addLine = function (str) {
        return 'yy.L(yylineno, '.concat(str.replace(';', ''), ');');
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
            newaction = addLine(addYY(getMatch(action)));
            return [
                patternString,
                '$$ = ' + (newaction) + ''
            ];
        }
    };
    startSymbol = 'Root';
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
            o('Terminator', function () {
                return null;
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
            o('Expressions ; Body', function () {
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
        Prototype: [
            o('PROTOTYPE', function () {
                return new Identifier('__prototype');
            })
        ],
        Rest: [
            o('& IDENTIFIER', function () {
                return new Identifier($2, true);
            })
        ],
        Body: [
            o('Expression'),
            o('{ OptTerminator Expressions }', function () {
                return $3;
            })
        ],
        Expression: [
            o('Exporting'),
            o('Assignable'),
            o('Exceptions'),
            o('Recur'),
            o('DefMacro')
        ],
        Assignable: [
            o('Value'),
            o('If'),
            o('Assignment'),
            o('Declaration'),
            o('PatternMatching'),
            o('Invocation'),
            o('Pipeline'),
            o('Cloning'),
            o('Prototype'),
            o('Macro'),
            o('IMPORT STR', function () {
                return new Import($2);
            })
        ],
        Value: [
            o('Literal'),
            o('Lists'),
            o('Maps'),
            o('Operation'),
            o('Access'),
            o('Type'),
            o('SpecialFunctions'),
            o('ARGS', function () {
                return 'arguments[' + ($1) + ']';
            }),
            o('( Assignable )', function () {
                return $2;
            })
        ],
        Values: [
            o('Value'),
            o('Invocation')
        ],
        Type: [
            o('TYPE', function () {
                return new Identifier($1);
            })
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
            o('NUM', function () {
                return new Literal(Number($1));
            }),
            o('Strings')
        ],
        Strings: [
            o('STR', function () {
                return new Literal(String($1));
            })
        ],
        Assignment: [
            o('Identifier = Assignable', function () {
                return new Assignment($1, $3);
            }),
            o('Access = Assignable', function () {
                return new Assignment($1, $3);
            }),
            o('Lists = Assignable', function () {
                return new Assignment($1, $3);
            }),
            o('Maps = Assignable', function () {
                return new Assignment($1, $3);
            })
        ],
        Exporting: [
            o('EXPORT Assignable', function () {
                return new Export($2);
            })
        ],
        Cloning: [
            o('Maps Value', function () {
                return new Cloning($2, $1);
            }),
            o('Lists Value', function () {
                return new Cloning($2, $1);
            })
        ],
        Pipeline: [
            o('Value | OptTerminator Values', function () {
                return new Pipeline($1, $4);
            }),
            o('Invocation | OptTerminator Values', function () {
                return new Pipeline($1, $4);
            }),
            o('Pipeline | OptTerminator Values', function () {
                return new Pipeline($1, $4);
            })
        ],
        Invocation: [
            o('Value : Arguments', function () {
                return new Call($1, $3);
            }),
            o('Value !', function () {
                return new Call($1);
            })
        ],
        Declaration: [
            o('FN [ Parameters ] Body', function () {
                return new Declaration(null, $3, $5);
            }),
            o('FN [ ] Body', function () {
                return new Declaration(null, null, $4);
            })
        ],
        Pattern: [
            o('Value ? Body TERMINATOR', function () {
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
            o('ELSE ? Body TERMINATOR', function () {
                return new Arguments([
                    $1,
                    $3
                ]);
            })
        ],
        PatternMatching: [
            o('FN [ Parameters ] TERMINATOR Patterns Default', function () {
                return new Declaration(null, $3, new Pattern($3, $6, $7));
            })
        ],
        Comma: [
            o(''),
            o(', OptTerminator')
        ],
        Numbers: [
            o('NUM'),
            o('Identifier')
        ],
        Lists: [
            o('[ ]', function () {
                return new List();
            }),
            o('[ OptTerminator ListArgs OptTerminator ]', function () {
                return new List($3);
            })
        ],
        ListArg: [
            o('Value'),
            o('Rest')
        ],
        ListArgs: [
            o('ListArg', function () {
                return new Arguments($1);
            }),
            o('ListArgs OptComma ListArg', function () {
                return new Arguments($1, $3);
            })
        ],
        Key: [
            o('KEY', function () {
                return new Identifier($1);
            })
        ],
        KeyValue: [
            o('Key', function () {
                return new Assignment($1, null);
            }),
            o('Key Value', function () {
                return new Assignment($1, $2);
            })
        ],
        MapItems: [
            o('KeyValue', function () {
                return new Arguments($1);
            }),
            o('MapItems OptComma KeyValue', function () {
                return new Arguments($1, $3);
            })
        ],
        Maps: [
            o('{ }', function () {
                return new Map();
            }),
            o('{ OptTerminator MapItems OptTerminator }', function () {
                return new Map($3);
            })
        ],
        Access: [
            o('Identifier Accessor', function () {
                return new Access($1, $2);
            }),
            o('Prototype Accessor', function () {
                return new Access($1, $2);
            }),
            o('Type Accessor', function () {
                return new Access($1, $2);
            }),
            o('Access Accessor', function () {
                return new Access($1, $2);
            })
        ],
        Accessor: [
            o('. Identifier', function () {
                return $2;
            }),
            o('. AlphaNumeric', function () {
                return $2;
            }),
            o('. PROTOTYPE', function () {
                return $2;
            })
        ],
        Arguments: [
            o('Value', function () {
                return new Arguments($1);
            }),
            o('Arguments Comma Value', function () {
                return new Arguments($1, $3);
            })
        ],
        Param: [
            o('Identifier'),
            o('( Identifier = Value )', function () {
                return new Assignment($2, $4);
            }),
            o('Rest'),
            o('Lists')
        ],
        OptComma: [
            o(', OptTerminator'),
            o('OptTerminator')
        ],
        Parameters: [
            o('Param', function () {
                return new Arguments($1);
            }),
            o('Parameters OptComma Param', function () {
                return new Arguments($1, $3);
            })
        ],
        Exceptions: [
            o('TRY Body OptTerminator CATCH Body', function () {
                return new Exception($2, $5);
            }),
            o('RAISE Value ErrorType', function () {
                return new Exception($1, $2, $3);
            })
        ],
        ErrorType: [
            o('', function () {
                return null;
            }),
            o('Identifier')
        ],
        Recur: [
            o('RECUR OptTerminator Arguments', function () {
                return new Recur($3);
            }),
            o('( RECUR OptTerminator Arguments )', function () {
                return new Recur($4);
            })
        ],
        If: [
            o('IF Values OptTerminator THEN Body OptTerminator ELSE Body', function () {
                return new If($2, $5, $8);
            })
        ],
        DefMacro: [
            o('MACRO Identifier Declaration', function () {
                return new Macro(true, $2, $3);
            })
        ],
        Macro: [
            o('Identifier Arguments', function () {
                return new Macro(false, $1, $2);
            })
        ],
        Operators: [
            o('+', function () {
                return new Identifier('sum');
            }),
            o('-', function () {
                return new Identifier('sub');
            }),
            o('*', function () {
                return new Identifier('prod');
            }),
            o('* *', function () {
                return new Identifier('pow');
            }),
            o('/', function () {
                return new Identifier('div');
            }),
            o('COMPARE', function () {
                return new Compare($1);
            }),
            o('LOGIC', function () {
                return new Compare($1);
            })
        ],
        SugaryFunctions: [
            o('Operators', function () {
                return $1;
            }),
            o('Accessor', function () {
                return new Declaration('->', new Arguments('it'), new Access('it', $1));
            }),
            o('Accessor : Arguments', function () {
                return new Declaration('->', new Arguments('it'), new Call(new Access('it', $1), $3));
            }),
            o('COMPARE Value', function () {
                return new Declaration('->', new Arguments('it'), new Compare('it', $1, $2));
            }),
            o('LEFT_OPERATORS Value', function () {
                return new Declaration('->', new Arguments('it'), new Operation('it', $1, $2));
            }),
            o('+ Value', function () {
                return new Declaration('->', new Arguments('it'), new Operation('it', $1, $2));
            }),
            o('- Value', function () {
                return new Declaration('->', new Arguments('it'), new Operation('it', $1, $2));
            }),
            o('* Value', function () {
                return new Declaration('->', new Arguments('it'), new Operation('it', $1, $2));
            }),
            o('* * Value', function () {
                return new Declaration('->', new Arguments('it'), new Operation('it', '**', $3));
            }),
            o('/ Value', function () {
                return new Declaration('->', new Arguments('it'), new Operation('it', $1, $2));
            })
        ],
        SpecialFunctions: [
            o('( SugaryFunctions )', function () {
                return $2;
            })
        ],
        Operation: [
            o('Value COMPARE OptTerminator Value', function () {
                return new Compare($1, $2, $4);
            }),
            o('Value LOGIC OptTerminator Value', function () {
                return new Compare($1, $2, $4);
            }),
            o('Value LEFT_OPERATORS OptTerminator Value', function () {
                return new Operation($1, $2, $4);
            }),
            o('Value RIGHT_OPERATORS OptTerminator Value', function () {
                return new Operation($1, $2, $4);
            }),
            o('NOT Value', function () {
                return new Compare($2, $1);
            }),
            o('Value + OptTerminator Value', function () {
                return new Operation($1, '+', $4);
            }),
            o('Value - OptTerminator Value', function () {
                return new Operation($1, '-', $4);
            }),
            o('Value * OptTerminator Value', function () {
                return new Operation($1, '*', $4);
            }),
            o('Value * * OptTerminator Value', function () {
                return new Operation($1, '**', $5);
            }),
            o('Value / OptTerminator Value', function () {
                return new Operation($1, '/', $4);
            })
        ]
    };
    tokens = [
        'ASSERT',
        'IF',
        'THEN',
        'ELSE',
        'FN',
        'KEY',
        'LAMBDA',
        'IDENTIFIER',
        'BOOL',
        'NUM',
        'STR',
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
            'EXPORT'
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
            '**',
            '/'
        ]
    ];
    parser = new jison.Parser({
        tokens: tokens,
        bnf: bnf,
        operators: operators,
        startSymbol: startSymbol
    });
    parser.lexer = {
        lex: function () {
            var ref;
            ref = this.tokens[this.pos] || [
                ''
            ];
            this.pos = this.pos + 1;
            this.yytext = ref[1];
            this.yylineno = ref[2];
            return ref[0];
        },
        setInput: function (tokens) {
            this.tokens = tokens;
            return this.pos = 0;
        }
    };
    return parser;
}());