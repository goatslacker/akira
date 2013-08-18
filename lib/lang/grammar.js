(function () {
    var jison, unwrap, getMatch, addYY, addLine, o, startSymbol, bnf, tokens, operators, parser;
    jison = require('jison');
    unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*)\s*\}/;
    getMatch = function (action) {
        var x;
        x = unwrap.exec(action);
        return x ? x[1] : '(' + (action) + '())';
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
        return function () {
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
        }();
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
            o('Terminator Statements', function (it) {
                return $2;
            }),
            o('Terminator', function (it) {
                return null;
            }),
            o('Statements')
        ],
        Statements: [
            o('Body', function () {
                return yy.Nodes.wrap($1);
            }),
            o('Statements TERMINATOR Body', function () {
                return $1.push($3);
            }),
            o('Statements ; Body', function () {
                return $1.push($3);
            }),
            o('Statements TERMINATOR')
        ],
        Terminator: [
            o('TERMINATOR'),
            o('Terminator TERMINATOR')
        ],
        OptTerminator: [
            o(''),
            o('Terminator')
        ],
        Identifier: [o('IDENTIFIER', function () {
                return new Identifier($1);
            })],
        Prototype: [o('PROTOTYPE', function () {
                return new Identifier('__prototype');
            })],
        Rest: [o('& IDENTIFIER', function () {
                return new Identifier($2, true);
            })],
        TBody: [o('{ OptTerminator Statements }', function () {
                return $3;
            })],
        Body: [
            o('TBody'),
            o('Statement')
        ],
        Statement: [
            o('Exporting'),
            o('Expression'),
            o('Exceptions'),
            o('Recur'),
            o('DefMacro'),
            o('TypeSignature')
        ],
        Expression: [
            o('Value'),
            o('If'),
            o('Assignment'),
            o('PatternMatching'),
            o('Cond'),
            o('Invocation'),
            o('InlineDeclaration'),
            o('AsyncDo'),
            o('MaybeSeq'),
            o('Let'),
            o('Pipeline'),
            o('Cloning'),
            o('Macro'),
            o('Raise'),
            o('IMPORT STR', function () {
                return new Import($2);
            })
        ],
        Value: [
            o('Values'),
            o('AnonymousFunction'),
            o('Declaration'),
            o('Access'),
            o('Operation')
        ],
        Values: [
            o('Literal'),
            o('Vectors'),
            o('Maps'),
            o('Type'),
            o('Prototype'),
            o('SpecialFunctions'),
            o('ArgumentsShorthand'),
            o('ArgumentsShorthand ^ Identifier', function () {
                return new Assignment($3, $1);
            }),
            o('( OptTerminator Expression OptTerminator )', function () {
                return $3;
            })
        ],
        ArgumentsShorthand: [o('ARGS', function () {
                return 'arguments[' + ($1) + ']';
            })],
        CallableValue: [
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
            o('NUM', function () {
                return new Literal(Number($1.replace(/,/g, '')));
            }),
            o('Strings')
        ],
        Strings: [o('STR', function () {
                return new Literal(String($1));
            })],
        Assignment: [
            o('Identifier = Expression', function () {
                return new Assignment($1, $3);
            }),
            o('Access = Expression', function () {
                return new Assignment($1, $3);
            }),
            o('Vectors = Expression', function () {
                return new Assignment($1, $3);
            }),
            o('Maps = Expression', function () {
                return new Assignment($1, $3);
            })
        ],
        Exporting: [o('EXPORT Expression', function () {
                return new Export($2);
            })],
        Cloning: [
            o('Identifier Arguments', function () {
                return new Cloning($2, $1);
            }),
            o('Maps Arguments', function () {
                return new Cloning($2, $1);
            }),
            o('Vectors Arguments', function () {
                return new Cloning($2, $1);
            })
        ],
        Pipeline: [
            o('Value | OptTerminator CallableValue', function () {
                return new Pipeline($1, $4);
            }),
            o('Invocation | OptTerminator CallableValue', function () {
                return new Pipeline($1, $4);
            }),
            o('Pipeline | OptTerminator CallableValue', function () {
                return new Pipeline($1, $4);
            })
        ],
        Invocation: [
            o('Value : Arguments', function () {
                return new Call($1, $3);
            }),
            o('Value !', function () {
                return new Call($1);
            }),
            o('Value & !', function () {
                return new Call($1, 'apply');
            })
        ],
        Declaration: [
            o('FN [ Parameters ] TBody', function () {
                return new Declaration(null, $3, $5);
            }),
            o('FN [ ] TBody', function () {
                return new Declaration(null, null, $4);
            })
        ],
        InlineDeclaration: [
            o('FN [ Parameters ] Expression', function () {
                return new Declaration(null, $3, $5);
            }),
            o('FN [ Parameters ] TERMINATOR Expression', function () {
                return new Declaration(null, $3, $6);
            }),
            o('FN [ ] Expression', function () {
                return new Declaration(null, null, $4);
            })
        ],
        LetOperation: [o('Assignment Terminator')],
        LetOperations: [
            o('LetOperation', function () {
                return new Arguments($1);
            }),
            o('LetOperations LetOperation', function () {
                return new Arguments($1, $2);
            })
        ],
        Let: [o('LET OptTerminator LetOperations THEN OptTerminator Expression TERMINATOR', function () {
                return new Let($3, $6);
            })],
        MaybeOperation: [
            o('Identifier DO_OPERATOR Value TERMINATOR', function () {
                return new Assignment($1, $3);
            }),
            o('Expression TERMINATOR', function () {
                return {expr: $1};
            })
        ],
        MaybeOperations: [
            o('MaybeOperation', function () {
                return new Arguments($1);
            }),
            o('MaybeOperations MaybeOperation', function () {
                return new Arguments($1, $2);
            })
        ],
        MaybeSeq: [o('MAYBE Terminator MaybeOperations', function () {
                return new MaybeSeq($3);
            })],
        DoOperation: [
            o('Vectors DO_OPERATOR RETURN Value TERMINATOR', function () {
                return {
                    args: $1,
                    call: $4,
                    isReturn: true
                };
            }),
            o('Vectors DO_OPERATOR Invocation TERMINATOR', function () {
                return {
                    args: $1,
                    call: $3
                };
            }),
            o('Expression TERMINATOR', function () {
                return {expr: $1};
            })
        ],
        DoOperations: [
            o('DoOperation', function () {
                return new Arguments($1);
            }),
            o('DoOperations DoOperation', function () {
                return new Arguments($1, $2);
            })
        ],
        AsyncDo: [
            o('DO [ Parameters ] Terminator DoOperations', function () {
                return new Async($6, $3);
            }),
            o('DO Terminator DoOperations', function () {
                return new Async($3, null);
            })
        ],
        AnonymousFunction: [o('LAMBDA ( Expression )', function () {
                return new Declaration(null, null, $3);
            })],
        Conditional: [o('Value ? Body Terminator', function () {
                return [
                    $1,
                    $3
                ];
            })],
        Conditionals: [
            o('Conditional', function () {
                return new Arguments($1);
            }),
            o('Conditionals Conditional', function () {
                return new Arguments($1, $2);
            })
        ],
        CondElse: [o('ELSE ? Body', function () {
                return [
                    $1,
                    $3
                ];
            })],
        Cond: [o('COND TERMINATOR Conditionals CondElse', function () {
                return new Cond($3, $4);
            })],
        Pattern: [
            o('[ ] Body TERMINATOR', function () {
                return [
                    null,
                    $3
                ];
            }),
            o('[ VectorArgs ] Body TERMINATOR', function () {
                return [
                    $2,
                    $4
                ];
            }),
            o('[ ELSE ] Body TERMINATOR', function () {
                return [
                    $2,
                    $4
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
        PatternMatching: [o('MATCH { OptTerminator Patterns }', function () {
                return new Pattern($4);
            })],
        Comma: [
            o(''),
            o(', OptTerminator')
        ],
        Vectors: [
            o('[ ]', function () {
                return new Vector();
            }),
            o('[ OptTerminator VectorArgs OptTerminator ]', function () {
                return new Vector($3);
            })
        ],
        VectorArg: [
            o('Value'),
            o('Rest')
        ],
        VectorArgs: [
            o('VectorArg', function () {
                return new Arguments($1);
            }),
            o('VectorArgs OptComma VectorArg', function () {
                return new Arguments($1, $3);
            })
        ],
        Key: [o('KEY', function () {
                return new Identifier($1);
            })],
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
            o('Values Accessor', function () {
                return new Access($1, $2);
            }),
            o('Access Accessor', function () {
                return new Access($1, $2);
            })
        ],
        Accessor: [
            o('. Literal', function () {
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
            o('Vectors')
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
        Exceptions: [o('TRY Body OptTerminator CATCH Identifier Body', function () {
                return new ExceptionGuard($2, $5, $6);
            })],
        Raise: [o('RAISE Value ErrorType', function () {
                return new Exception($1, $2, $3);
            })],
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
        If: [o('IF CallableValue OptTerminator THEN Body OptTerminator ELSE Body', function () {
                return new If($2, $5, $8);
            })],
        DefMacro: [o('MACRO Identifier Declaration', function () {
                return new Macro($2, $3);
            })],
        TypeValues: [
            o('Identifier'),
            o('VectorType'),
            o('MapType'),
            o('MAYBE TypeValues', function () {
                return new Type($2, 'maybe');
            })
        ],
        TypeValue: [
            o('TypeValues'),
            o('TypeValues | TypeValue', function () {
                return new Type([
                    $1,
                    $3
                ], 'or');
            })
        ],
        VectorType: [o('[ TypeParams ]', function () {
                return new Type($2, 'vector');
            })],
        MapType: [o('{ MapTypeParams }', function () {
                return new Type($2, 'map');
            })],
        MaybeTypeParams: [
            o(''),
            o('TypeParams')
        ],
        TypeKeyValue: [
            o('Key', function () {
                return new Assignment($1, null);
            }),
            o('Key TypeValue', function () {
                return new Assignment($1, $2);
            })
        ],
        MapTypeParams: [
            o('TypeKeyValue', function () {
                return new Arguments($1);
            }),
            o('MapTypeParams TypeKeyValue', function () {
                return new Arguments($1, $2);
            })
        ],
        TypeParams: [
            o('TypeValue', function () {
                return new Arguments($1);
            }),
            o('TypeParams TypeValue', function () {
                return new Arguments($1, $2);
            })
        ],
        TypeSignature: [o('Identifier TYPE_OPERATOR MaybeTypeParams LAMBDA TypeValue', function () {
                return new TypeSignature($1, $3, $5);
            })],
        Macro: [
            o('` OptTerminator Statement', function () {
                return new Evaluate($3);
            }),
            o('~ OptTerminator Statement', function () {
                return new Evaluate($3, true);
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
                return new Logic($1);
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
            o('= Value', function () {
                return new Declaration('->', new Arguments('it'), $2);
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
        SpecialFunctions: [o('( SugaryFunctions )', function () {
                return $2;
            })],
        Operation: [
            o('Value COMPARE OptTerminator Value', function () {
                return new Compare($1, $2, $4);
            }),
            o('Value LOGIC OptTerminator Value', function () {
                return new Logic($1, $2, $4);
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
        'MATCH',
        'KEY',
        'LAMBDA',
        'IDENTIFIER',
        'BOOL',
        'NUM',
        'STR',
        'LOGIC',
        'COMPARE',
        'DO',
        'RETURN',
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
            ref = this.tokens[this.pos] || [''];
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
    module.exports = parser;
}());