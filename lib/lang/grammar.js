(function () {
    var jison, unwrap, getMatch, o, startSymbol, bnf, tokens, operators, parser;
    jison = require('jison');
    unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*)\s*\}/;
    getMatch = function (action) {
        var x;
        x = unwrap.exec(action);
        return x ? x[1] : '(' + (action) + '())';
    };
    o = function (pattern, action) {
        var patternString, xaction;
        patternString = pattern.replace(/\s{2,}/g, ' ');
        return function () {
            if (!action) {
                return [
                    patternString,
                    '$$ = $1'
                ];
            } else {
                xaction = getMatch(action);
                return [
                    patternString,
                    '$$ = ' + (xaction) + ''
                ];
            }
        }.apply(this, arguments);
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
                return yy.L(yylineno, new yy.Identifier($1));
            })],
        Prototype: [o('PROTOTYPE', function () {
                return yy.L(yylineno, new yy.Identifier('__prototype'));
            })],
        Rest: [o('& IDENTIFIER', function () {
                return yy.L(yylineno, new yy.Identifier($2, true));
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
            o('Recur'),
            o('DefMacro'),
            o('TypeSignature'),
            o('TypeAlias')
        ],
        Expression: [
            o('Value'),
            o('If'),
            o('Assignment'),
            o('PatternMatching'),
            o('Cond'),
            o('Invocation'),
            o('InlineDeclaration'),
            o('Async'),
            o('AsyncDo'),
            o('MaybeSeq'),
            o('Let'),
            o('Pipeline'),
            o('Cloning'),
            o('Instantiate'),
            o('Macro'),
            o('Raise'),
            o('Exceptions'),
            o('IMPORT STR', function () {
                return yy.L(yylineno, new yy.Import($2));
            })
        ],
        Value: [
            o('Accessibles'),
            o('Class'),
            o('Operation')
        ],
        Callable: [
            o('Identifier'),
            o('Declaration'),
            o('ArgumentsShorthand'),
            o('Access')
        ],
        Accessibles: [
            o('Callable'),
            o('Literal'),
            o('Vectors'),
            o('Maps'),
            o('Type'),
            o('Prototype'),
            o('SpecialFunctions'),
            o('ArgumentsShorthand ^ Identifier', function () {
                return yy.L(yylineno, new yy.Assignment($3, $1));
            }),
            o('( OptTerminator Expression OptTerminator )', function () {
                return $3;
            })
        ],
        ArgumentsShorthand: [o('ARGS', function () {
                return 'arguments[' + ($1) + ']';
            })],
        Literal: [
            o('AlphaNumeric'),
            o('NONE', function () {
                return yy.L(yylineno, new yy.Literal(null));
            }),
            o('BOOL', function () {
                return yy.L(yylineno, new yy.Literal($1 === 'true'));
            }),
            o('REGEXP', function () {
                return yy.L(yylineno, new yy.Literal($1));
            })
        ],
        AlphaNumeric: [
            o('NUM', function () {
                return yy.L(yylineno, new yy.Literal(Number($1.replace(/,/g, ''))));
            }),
            o('Strings')
        ],
        Strings: [o('STR', function () {
                return yy.L(yylineno, new yy.Literal(String($1)));
            })],
        Assignment: [
            o('Identifier = Expression', function () {
                return yy.L(yylineno, new yy.Assignment($1, $3));
            }),
            o('Access = Expression', function () {
                return yy.L(yylineno, new yy.Assignment($1, $3));
            }),
            o('Vectors = Expression', function () {
                return yy.L(yylineno, new yy.Assignment($1, $3));
            }),
            o('Maps = Expression', function () {
                return yy.L(yylineno, new yy.Assignment($1, $3));
            })
        ],
        Exporting: [o('EXPORT Expression', function () {
                return yy.L(yylineno, new yy.Export($2));
            })],
        Cloning: [
            o('Identifier : Arguments', function () {
                return yy.L(yylineno, new yy.Cloning($3, $1));
            }),
            o('Maps Arguments', function () {
                return yy.L(yylineno, new yy.Cloning($2, $1));
            }),
            o('Vectors Arguments', function () {
                return yy.L(yylineno, new yy.Cloning($2, $1));
            })
        ],
        CallableValue: [
            o('Value'),
            o('Invocation')
        ],
        Pipeline: [
            o('Value | OptTerminator CallableValue', function () {
                return yy.L(yylineno, new yy.Pipeline($1, $4));
            }),
            o('Invocation | OptTerminator CallableValue', function () {
                return yy.L(yylineno, new yy.Pipeline($1, $4));
            }),
            o('Pipeline | OptTerminator CallableValue', function () {
                return yy.L(yylineno, new yy.Pipeline($1, $4));
            })
        ],
        Invocation: [
            o('Callable Arguments', function () {
                return yy.L(yylineno, new yy.Call($1, $2));
            }),
            o('Callable !', function () {
                return yy.L(yylineno, new yy.Call($1));
            }),
            o('Callable & !', function () {
                return yy.L(yylineno, new yy.Call($1, 'apply'));
            })
        ],
        Declaration: [
            o('FN [ Parameters ] TBody', function () {
                return yy.L(yylineno, new yy.Declaration(null, $3, $5));
            }),
            o('FN [ ] TBody', function () {
                return yy.L(yylineno, new yy.Declaration(null, null, $4));
            }),
            o('LAMBDA TBody', function () {
                return yy.L(yylineno, new yy.Declaration(null, null, $2));
            })
        ],
        InlineDeclaration: [
            o('FN [ Parameters ] Expression', function () {
                return yy.L(yylineno, new yy.Declaration(null, $3, $5));
            }),
            o('FN [ Parameters ] TERMINATOR Expression', function () {
                return yy.L(yylineno, new yy.Declaration(null, $3, $6));
            }),
            o('FN [ ] Expression', function () {
                return yy.L(yylineno, new yy.Declaration(null, null, $4));
            }),
            o('LAMBDA Expression', function () {
                return yy.L(yylineno, new yy.Declaration(null, null, $2));
            })
        ],
        LetOperation: [o('Assignment Terminator')],
        LetOperations: [
            o('LetOperation', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('LetOperations LetOperation', function () {
                return yy.L(yylineno, new yy.Arguments($1, $2));
            })
        ],
        Let: [o('LET OptTerminator LetOperations THEN OptTerminator Expression TERMINATOR', function () {
                return yy.L(yylineno, new yy.Let($3, $6));
            })],
        MaybeParameters: [
            o('Value', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('MaybeParameters OptComma Value', function () {
                return yy.L(yylineno, new yy.Arguments($1, $3));
            })
        ],
        MaybeSeq: [
            o('MAYBE Value', function () {
                return yy.L(yylineno, new yy.MaybeSeq($2));
            }),
            o('MAYBE Value TBody', function () {
                return yy.L(yylineno, new yy.MaybeSeq($2, $3));
            })
        ],
        DoOperation: [
            o('Vectors DO_OPERATOR Invocation TERMINATOR', function () {
                return {
                    args: $1,
                    call: $3
                };
            }),
            o('Vectors DO_OPERATOR Identifier TERMINATOR', function () {
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
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('DoOperations DoOperation', function () {
                return yy.L(yylineno, new yy.Arguments($1, $2));
            })
        ],
        Async: [o('TASK [ Parameters ] OptTerminator AsyncDo', function () {
                return yy.L(yylineno, new yy.Async($6, $3));
            })],
        AsyncDo: [
            o('DO Terminator DoOperations', function () {
                return yy.L(yylineno, new yy.Do($3));
            }),
            o('DO { OptTerminator DoOperations }', function () {
                return yy.L(yylineno, new yy.Do($4));
            })
        ],
        Conditional: [o('Value ? Body Terminator', function () {
                return [
                    $1,
                    $3
                ];
            })],
        Conditionals: [
            o('Conditional', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('Conditionals Conditional', function () {
                return yy.L(yylineno, new yy.Arguments($1, $2));
            })
        ],
        CondElse: [o('ELSE ? Body', function () {
                return [
                    $1,
                    $3
                ];
            })],
        Cond: [o('COND TERMINATOR Conditionals CondElse', function () {
                return yy.L(yylineno, new yy.Cond($3, $4));
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
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('Patterns Pattern', function () {
                return yy.L(yylineno, new yy.Arguments($1, $2));
            })
        ],
        PatternMatching: [o('MATCH { OptTerminator Patterns }', function () {
                return yy.L(yylineno, new yy.Pattern($4));
            })],
        Comma: [
            o(''),
            o(', OptTerminator')
        ],
        Vectors: [
            o('[ ]', function () {
                return yy.L(yylineno, new yy.Vector());
            }),
            o('[ OptTerminator VectorArgs OptTerminator ]', function () {
                return yy.L(yylineno, new yy.Vector($3));
            })
        ],
        VectorArg: [
            o('Value'),
            o('Rest'),
            o('CATCH')
        ],
        VectorArgs: [
            o('VectorArg', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('VectorArgs OptComma VectorArg', function () {
                return yy.L(yylineno, new yy.Arguments($1, $3));
            })
        ],
        Key: [o('KEY', function () {
                return yy.L(yylineno, new yy.Identifier($1));
            })],
        KeyValue: [
            o('Key', function () {
                return yy.L(yylineno, new yy.Assignment($1, null));
            }),
            o('Key Value', function () {
                return yy.L(yylineno, new yy.Assignment($1, $2));
            })
        ],
        MapItems: [
            o('KeyValue', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('MapItems OptComma KeyValue', function () {
                return yy.L(yylineno, new yy.Arguments($1, $3));
            })
        ],
        TypeAlias: [o('TYPEALIAS Identifier TypeValues', function () {
                return yy.L(yylineno, new yy.TypeAlias(yy.L(yylineno, new yy.TypeSignature($2, '', $3))));
            })],
        Maps: [
            o('{ }', function () {
                return yy.L(yylineno, new yy.Map());
            }),
            o('{ OptTerminator MapItems OptTerminator }', function () {
                return yy.L(yylineno, new yy.Map($3));
            })
        ],
        Access: [o('Accessibles Accessor', function () {
                return yy.L(yylineno, new yy.Access($1, $2));
            })],
        Accessor: [
            o('. Identifier', function () {
                return $2;
            }),
            o('. Literal', function () {
                return $2;
            }),
            o('. PROTOTYPE', function () {
                return $2;
            })
        ],
        Arguments: [
            o('Value', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('Arguments Comma Value', function () {
                return yy.L(yylineno, new yy.Arguments($1, $3));
            })
        ],
        Param: [
            o('Identifier'),
            o('( Identifier = Value )', function () {
                return yy.L(yylineno, new yy.Assignment($2, $4));
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
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('Parameters OptComma Param', function () {
                return yy.L(yylineno, new yy.Arguments($1, $3));
            })
        ],
        ClassMethod: [
            o('Identifier [ Parameters ] TBody', function () {
                return yy.L(yylineno, new yy.ClassMethod($1, $3, $5));
            }),
            o('Identifier [ ] TBody', function () {
                return yy.L(yylineno, new yy.ClassMethod($1, null, $4));
            })
        ],
        ClassMethods: [
            o('ClassMethod', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('ClassMethods Terminator ClassMethod', function () {
                return yy.L(yylineno, new yy.Arguments($1, $3));
            })
        ],
        Constructor: [
            o('[ Parameters ] TBody', function () {
                return yy.L(yylineno, new yy.ClassMethod(null, $2, $4));
            }),
            o('[ ] TBody', function () {
                return yy.L(yylineno, new yy.ClassMethod(null, null, $3));
            })
        ],
        Class: [
            o('CLASS { Terminator Constructor Terminator }', function () {
                return yy.L(yylineno, new yy.Class($4, []));
            }),
            o('CLASS { Terminator Constructor Terminator ClassMethods Terminator }', function () {
                return yy.L(yylineno, new yy.Class($4, $6));
            })
        ],
        Instantiate: [o('NEW Invocation', function () {
                return yy.L(yylineno, new yy.Instantiate($2));
            })],
        Exceptions: [o('TRY Body OptTerminator CATCH Identifier Body', function () {
                return yy.L(yylineno, new yy.ExceptionGuard($2, $5, $6));
            })],
        Raise: [o('RAISE Value ErrorType', function () {
                return yy.L(yylineno, new yy.Exception($1, $2, $3));
            })],
        ErrorType: [
            o('', function () {
                return null;
            }),
            o('Identifier')
        ],
        Recur: [
            o('RECUR OptTerminator Arguments', function () {
                return yy.L(yylineno, new yy.Recur($3));
            }),
            o('( RECUR OptTerminator Arguments )', function () {
                return yy.L(yylineno, new yy.Recur($4));
            })
        ],
        If: [o('IF CallableValue OptTerminator THEN Body OptTerminator ELSE Body', function () {
                return yy.L(yylineno, new yy.If($2, $5, $8));
            })],
        DefMacro: [o('MACRO Identifier Declaration', function () {
                return yy.L(yylineno, new yy.Macro($2, $3));
            })],
        TypeValues: [
            o('Identifier'),
            o('VectorType'),
            o('MapType'),
            o('MAYBE TypeValues', function () {
                return yy.L(yylineno, new yy.Type($2, 'maybe'));
            })
        ],
        TypeValue: [
            o('TypeValues'),
            o('TypeValues | TypeValue', function () {
                return yy.L(yylineno, new yy.Type([
                    $1,
                    $3
                ], 'or'));
            })
        ],
        VectorType: [o('[ TypeParams ]', function () {
                return yy.L(yylineno, new yy.Type($2, 'vector'));
            })],
        MapType: [o('{ OptTerminator MapTypeParams OptTerminator }', function () {
                return yy.L(yylineno, new yy.Type($3, 'map'));
            })],
        MaybeTypeParams: [
            o(''),
            o('TypeParams')
        ],
        TypeKeyValue: [
            o('Key', function () {
                return yy.L(yylineno, new yy.Assignment($1, null));
            }),
            o('Key TypeValue', function () {
                return yy.L(yylineno, new yy.Assignment($1, $2));
            })
        ],
        MapTypeParams: [
            o('TypeKeyValue', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('MapTypeParams TypeKeyValue', function () {
                return yy.L(yylineno, new yy.Arguments($1, $2));
            })
        ],
        TypeParams: [
            o('TypeValue', function () {
                return yy.L(yylineno, new yy.Arguments($1));
            }),
            o('TypeParams TypeValue', function () {
                return yy.L(yylineno, new yy.Arguments($1, $2));
            })
        ],
        TypeSignature: [o('Identifier TYPE_OPERATOR MaybeTypeParams LAMBDA TypeValue', function () {
                return yy.L(yylineno, new yy.TypeSignature($1, $3, $5));
            })],
        Macro: [
            o('` OptTerminator Statement', function () {
                return yy.L(yylineno, new yy.Evaluate($3));
            }),
            o('~ OptTerminator Statement', function () {
                return yy.L(yylineno, new yy.Evaluate($3, true));
            })
        ],
        Operators: [
            o('+', function () {
                return yy.L(yylineno, new yy.Identifier('sum'));
            }),
            o('-', function () {
                return yy.L(yylineno, new yy.Identifier('sub'));
            }),
            o('*', function () {
                return yy.L(yylineno, new yy.Identifier('prod'));
            }),
            o('* *', function () {
                return yy.L(yylineno, new yy.Identifier('pow'));
            }),
            o('/', function () {
                return yy.L(yylineno, new yy.Identifier('div'));
            }),
            o('COMPARE', function () {
                return yy.L(yylineno, new yy.Compare($1));
            }),
            o('LOGIC', function () {
                return yy.L(yylineno, new yy.Logic($1));
            })
        ],
        SugaryFunctions: [
            o('Operators', function () {
                return $1;
            }),
            o('Accessor', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Access('it', $1))));
            }),
            o('Accessor Arguments', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Call(yy.L(yylineno, new yy.Access('it', $1)), $2))));
            }),
            o('COMPARE Value', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Compare('it', $1, $2))));
            }),
            o('LEFT_OPERATORS Value', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Operation('it', $1, $2))));
            }),
            o('= Value', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), $2));
            }),
            o('+ Value', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Operation('it', $1, $2))));
            }),
            o('- Value', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Operation('it', $1, $2))));
            }),
            o('* Value', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Operation('it', $1, $2))));
            }),
            o('* * Value', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Operation('it', '**', $3))));
            }),
            o('/ Value', function () {
                return yy.L(yylineno, new yy.Declaration('->', yy.L(yylineno, new yy.Arguments('it')), yy.L(yylineno, new yy.Operation('it', $1, $2))));
            })
        ],
        SpecialFunctions: [o('( SugaryFunctions )', function () {
                return $2;
            })],
        Operation: [
            o('Value COMPARE OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Compare($1, $2, $4));
            }),
            o('Value LOGIC OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Logic($1, $2, $4));
            }),
            o('Value LEFT_OPERATORS OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Operation($1, $2, $4));
            }),
            o('Value RIGHT_OPERATORS OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Operation($1, $2, $4));
            }),
            o('NOT Value', function () {
                return yy.L(yylineno, new yy.Compare($2, $1));
            }),
            o('Value + OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Operation($1, '+', $4));
            }),
            o('Value - OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Operation($1, '-', $4));
            }),
            o('Value * OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Operation($1, '*', $4));
            }),
            o('Value * * OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Operation($1, '**', $5));
            }),
            o('Value / OptTerminator Value', function () {
                return yy.L(yylineno, new yy.Operation($1, '/', $4));
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