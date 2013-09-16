(function () {
    var eq, eqVal, deepEq, neq, gt, lt, gte, lte, and, or, head, init, tail, last, get, length, join, reverse, toMap, concat, count, zipWith, average, compact, concatMap, assert, find, call, keys, values, key, value, filter, map, foldl, foldr, asyncmap, intersect, max, min, nothing, randomize, take, drop, takeWhile, apply, compose, sequence, id, flip, partial, partialr, curry, bind, If, when, maybeSeq, show, mod, bitAnd, bitOr, bitXor, bitShiftl, bitShiftr, bitUshiftr, square, sum, sub, prod, div, even, odd, abs, sqrt, pow, inc, dec, false$QUOT, true$QUOT, pos$QUOT, neg$QUOT, zero$QUOT, num$QUOT, str$QUOT, map$QUOT, vector$QUOT, bool$QUOT, none$QUOT, camelize, uppercase, stringify, capitalize, chars, condense, lines, words, print;
    return module.exports = {
        eq: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'eq',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        eqVal: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'eqVal',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '===',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
                                                __core: false,
                                                __rest: false
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'b',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: null
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        deepEq: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'deepEq',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '!==',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'length',
                                                    __core: true,
                                                    __rest: false
                                                }
                                            },
                                            right: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'length',
                                                    __core: true,
                                                    __rest: false
                                                }
                                            }
                                        },
                                        consequent: {
                                            type: 'Literal',
                                            value: false
                                        },
                                        alternate: {
                                            type: 'ConditionalExpression',
                                            test: {
                                                type: 'BinaryExpression',
                                                operator: '===',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'length',
                                                        __core: true,
                                                        __rest: false
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 0
                                                }
                                            },
                                            consequent: {
                                                type: 'Literal',
                                                value: false
                                            },
                                            alternate: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'eq',
                                                    __core: true,
                                                    __rest: false
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Literal',
                                                        value: true
                                                    },
                                                    {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'foldl',
                                                            __core: true,
                                                            __rest: false
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'and',
                                                                __core: true,
                                                                __rest: false
                                                            },
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'zipWith',
                                                                    __core: true,
                                                                    __rest: false
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'eq',
                                                                        __core: true,
                                                                        __rest: false
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'a',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'b',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        neq: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'neq',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '!==',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        gt: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'gt',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        lt: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'lt',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '<',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        gte: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'gte',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        lte: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'lte',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '<=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        and: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'and',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        operator: '&&',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        or: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'or',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        operator: '||',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        head: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'head',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: '_$fv',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [{
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: true,
                                            object: {
                                                type: 'Identifier',
                                                name: '_$fv',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Literal',
                                                value: 0
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'x',
                                        __core: false,
                                        __rest: false
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        init: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'init',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: '_$fv',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'xs',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }
                                    ],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'xs',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: '_$fv',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'slice',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Literal',
                                                    value: 0
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_$fv',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 1
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: true,
                                            object: {
                                                type: 'Identifier',
                                                name: '_$fv',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'BinaryExpression',
                                                operator: '-',
                                                left: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: '_$fv',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'length',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 1
                                                }
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'xs',
                                        __core: false,
                                        __rest: false
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        tail: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'tail',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: '_$fv',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'xs',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }
                                    ],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: true,
                                            object: {
                                                type: 'Identifier',
                                                name: '_$fv',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Literal',
                                                value: 0
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'xs',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: '_$fv',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'slice',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_$fv',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'xs',
                                        __core: false,
                                        __rest: false
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        last: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'last',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'xs',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'MemberExpression',
                                        computed: true,
                                        object: {
                                            type: 'Identifier',
                                            name: 'xs',
                                            __core: false,
                                            __rest: false
                                        },
                                        property: {
                                            type: 'BinaryExpression',
                                            operator: '-',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'xs',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'length',
                                                    __core: true,
                                                    __rest: false
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 1
                                            }
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        get: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'get',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'obj',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'prop',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'MemberExpression',
                                        computed: true,
                                        object: {
                                            type: 'Identifier',
                                            name: 'obj',
                                            __core: false,
                                            __rest: false
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'prop',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        length: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'length',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'of',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'of',
                                            __core: false,
                                            __rest: false
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'length',
                                            __core: true,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        join: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'join',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'by',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'join',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: [{
                                                type: 'Identifier',
                                                name: 'by',
                                                __core: false,
                                                __rest: false
                                            }]
                                    }
                                }]
                        }
                    }
                }
            }],
        reverse: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'reverse',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'coll',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'coll',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'reverse',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: []
                                    }
                                }]
                        }
                    }
                }
            }],
        toMap: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'toMap',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'coll',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [{
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            properties: []
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'coll',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'forEach',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: [{
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [{
                                                        type: 'Identifier',
                                                        name: 'i',
                                                        __core: false,
                                                        __rest: false
                                                    }],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'VariableDeclaration',
                                                            declarations: [
                                                                {
                                                                    type: 'VariableDeclarator',
                                                                    id: {
                                                                        type: 'Identifier',
                                                                        name: '_$v',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    init: null
                                                                },
                                                                {
                                                                    type: 'VariableDeclarator',
                                                                    id: {
                                                                        type: 'Identifier',
                                                                        name: 'key',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    init: null
                                                                },
                                                                {
                                                                    type: 'VariableDeclarator',
                                                                    id: {
                                                                        type: 'Identifier',
                                                                        name: 'val',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    init: null
                                                                }
                                                            ],
                                                            kind: 'var'
                                                        },
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'AssignmentExpression',
                                                                operator: '=',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: '_$v',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                right: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'Identifier',
                                                                        name: 'f',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'i',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }]
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'AssignmentExpression',
                                                                operator: '=',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'key',
                                                                    __core: true,
                                                                    __rest: false
                                                                },
                                                                right: {
                                                                    type: 'MemberExpression',
                                                                    computed: true,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: '_$v',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    property: {
                                                                        type: 'Literal',
                                                                        value: 0
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'AssignmentExpression',
                                                                operator: '=',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'val',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                right: {
                                                                    type: 'MemberExpression',
                                                                    computed: true,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: '_$v',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    property: {
                                                                        type: 'Literal',
                                                                        value: 1
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'AssignmentExpression',
                                                                operator: '=',
                                                                left: {
                                                                    type: 'MemberExpression',
                                                                    computed: true,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'key',
                                                                        __core: true,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'val',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            }]
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'x',
                                        __core: false,
                                        __rest: false
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        concat: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'concat',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'c',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'SwitchStatement',
                                    discriminant: {
                                        type: 'Literal',
                                        value: false
                                    },
                                    cases: [
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 1
                                                    }
                                                }
                                            },
                                            consequent: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                }]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 2
                                                    }
                                                }
                                            },
                                            consequent: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'a',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'concat',
                                                                __core: false,
                                                                __rest: false
                                                            }
                                                        },
                                                        arguments: [{
                                                                type: 'Identifier',
                                                                name: 'b',
                                                                __core: false,
                                                                __rest: false
                                                            }]
                                                    }
                                                }]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 3
                                                    }
                                                }
                                            },
                                            consequent: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'a',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'concat',
                                                                __core: false,
                                                                __rest: false
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'b',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            {
                                                                type: 'Identifier',
                                                                name: 'c',
                                                                __core: false,
                                                                __rest: false
                                                            }
                                                        ]
                                                    }
                                                }]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'Literal',
                                                    value: true
                                                }
                                            },
                                            consequent: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'foldl',
                                                            __core: true,
                                                            __rest: false
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'FunctionExpression',
                                                                id: null,
                                                                params: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'a',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'b',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                ],
                                                                body: {
                                                                    type: 'BlockStatement',
                                                                    body: [{
                                                                            type: 'ReturnStatement',
                                                                            argument: {
                                                                                type: 'CallExpression',
                                                                                callee: {
                                                                                    type: 'MemberExpression',
                                                                                    computed: false,
                                                                                    object: {
                                                                                        type: 'Identifier',
                                                                                        name: 'a',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'concat',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    }
                                                                                },
                                                                                arguments: [{
                                                                                        type: 'Identifier',
                                                                                        name: 'b',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    }]
                                                                            }
                                                                        }]
                                                                }
                                                            },
                                                            {
                                                                type: 'Identifier',
                                                                name: 'a',
                                                                __core: false,
                                                                __rest: false
                                                            }
                                                        ]
                                                    }
                                                }]
                                        }
                                    ]
                                }]
                        }
                    }
                }
            }],
        count: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'count',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'SwitchStatement',
                                    discriminant: {
                                        type: 'Literal',
                                        value: false
                                    },
                                    cases: [
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 1
                                                    }
                                                }
                                            },
                                            consequent: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'vec',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: true,
                                                            __rest: false
                                                        }
                                                    }
                                                }]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 2
                                                    }
                                                }
                                            },
                                            consequent: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'filter',
                                                                __core: true,
                                                                __rest: false
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'f',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'vec',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            ]
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: true,
                                                            __rest: false
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }]
                        }
                    }
                }
            }],
        zipWith: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'zipWith',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: '_$fv',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: '_$fv',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'a',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'as',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'b',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'bs',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }
                                    ],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: true,
                                            object: {
                                                type: 'Identifier',
                                                name: '_$fv',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Literal',
                                                value: 0
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'as',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: '_$fv',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'slice',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_$fv',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: true,
                                            object: {
                                                type: 'Identifier',
                                                name: '_$fv',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Literal',
                                                value: 0
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'bs',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: '_$fv',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'slice',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_$fv',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'LogicalExpression',
                                            operator: '||',
                                            left: {
                                                type: 'BinaryExpression',
                                                operator: '===',
                                                left: {
                                                    type: 'UnaryExpression',
                                                    operator: 'typeof',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 'undefined'
                                                }
                                            },
                                            right: {
                                                type: 'BinaryExpression',
                                                operator: '===',
                                                left: {
                                                    type: 'UnaryExpression',
                                                    operator: 'typeof',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 'undefined'
                                                }
                                            }
                                        },
                                        consequent: {
                                            type: 'ArrayExpression',
                                            elements: []
                                        },
                                        alternate: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ArrayExpression',
                                                    elements: [{
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'a',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'b',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            ]
                                                        }]
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'concat',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [{
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'zipWith',
                                                        __core: true,
                                                        __rest: false
                                                    },
                                                    arguments: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'f',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'as',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'bs',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    ]
                                                }]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        average: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'average',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '/',
                                        left: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'foldl',
                                                __core: true,
                                                __rest: false
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'sum',
                                                    __core: true,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'vec',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            ]
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'length',
                                                __core: true,
                                                __rest: false
                                            }
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        compact: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'compact',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'filter',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'Boolean',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'arguments[0]',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }]
                                                            }
                                                        }]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        concatMap: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'concatMap',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [{
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'result',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'result',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'ArrayExpression',
                                            elements: []
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'forEach',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: [{
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [{
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __core: false,
                                                        __rest: false
                                                    }],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'VariableDeclaration',
                                                            declarations: [{
                                                                    type: 'VariableDeclarator',
                                                                    id: {
                                                                        type: 'Identifier',
                                                                        name: 'item',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    init: null
                                                                }],
                                                            kind: 'var'
                                                        },
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'AssignmentExpression',
                                                                operator: '=',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'item',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                right: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'Identifier',
                                                                        name: 'f',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'x',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }]
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'ConditionalExpression',
                                                                test: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'Array',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'isArray',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'item',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }]
                                                                },
                                                                consequent: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'MemberExpression',
                                                                            computed: false,
                                                                            object: {
                                                                                type: 'MemberExpression',
                                                                                computed: false,
                                                                                object: {
                                                                                    type: 'Identifier',
                                                                                    name: 'Array',
                                                                                    __core: false,
                                                                                    __rest: false
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'prototype',
                                                                                    __core: false,
                                                                                    __rest: false
                                                                                }
                                                                            },
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'push',
                                                                                __core: false,
                                                                                __rest: false
                                                                            }
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'apply',
                                                                            __core: true,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'result',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'item',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    ]
                                                                },
                                                                alternate: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'result',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'push',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'item',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }]
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            }]
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'result',
                                        __core: false,
                                        __rest: false
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        assert: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'assert',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'FunctionExpression',
                                            id: null,
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'IfStatement',
                                                        test: {
                                                            type: 'BinaryExpression',
                                                            operator: '!==',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'a',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            right: {
                                                                type: 'Identifier',
                                                                name: 'b',
                                                                __core: false,
                                                                __rest: false
                                                            }
                                                        },
                                                        consequent: {
                                                            type: 'BlockStatement',
                                                            body: [
                                                                {
                                                                    type: 'ThrowStatement',
                                                                    argument: {
                                                                        type: 'NewExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'Error',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        arguments: [{
                                                                                type: 'BinaryExpression',
                                                                                operator: '+',
                                                                                left: {
                                                                                    type: 'BinaryExpression',
                                                                                    operator: '+',
                                                                                    left: {
                                                                                        type: 'BinaryExpression',
                                                                                        operator: '+',
                                                                                        left: {
                                                                                            type: 'BinaryExpression',
                                                                                            operator: '+',
                                                                                            left: {
                                                                                                type: 'Literal',
                                                                                                value: 'Expected '
                                                                                            },
                                                                                            right: {
                                                                                                type: 'Identifier',
                                                                                                name: '(a)',
                                                                                                __core: false,
                                                                                                __rest: false
                                                                                            }
                                                                                        },
                                                                                        right: {
                                                                                            type: 'Literal',
                                                                                            value: ' == '
                                                                                        }
                                                                                    },
                                                                                    right: {
                                                                                        type: 'Identifier',
                                                                                        name: '(b)',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    }
                                                                                },
                                                                                right: {
                                                                                    type: 'Literal',
                                                                                    value: ''
                                                                                }
                                                                            }]
                                                                    }
                                                                },
                                                                {
                                                                    type: 'ReturnStatement',
                                                                    argument: {
                                                                        type: 'Literal',
                                                                        value: false
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        alternate: {
                                                            type: 'BlockStatement',
                                                            body: [{
                                                                    type: 'ReturnStatement',
                                                                    argument: {
                                                                        type: 'Literal',
                                                                        value: true
                                                                    }
                                                                }]
                                                        }
                                                    }]
                                            }
                                        },
                                        arguments: []
                                    }
                                }]
                        }
                    }
                }
            }],
        find: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'find',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'ds',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ForInStatement',
                                    left: {
                                        type: 'VariableDeclaration',
                                        declarations: [{
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'i',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                init: null
                                            }],
                                        kind: 'var'
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'ds',
                                        __core: false,
                                        __rest: false
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        body: [{
                                                type: 'IfStatement',
                                                test: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'f',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        arguments: [{
                                                                type: 'MemberExpression',
                                                                computed: true,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'ds',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'i',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            }]
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: true
                                                    }
                                                },
                                                consequent: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'Identifier',
                                                                name: 'i',
                                                                __core: false,
                                                                __rest: false
                                                            }
                                                        }]
                                                },
                                                alternate: null
                                            }]
                                    },
                                    each: false
                                }]
                        }
                    }
                }
            }],
        call: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'call',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'obj',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'prop',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __core: false,
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'args',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arguments',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: 2
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'FunctionExpression',
                                            id: null,
                                            params: [{
                                                    type: 'Identifier',
                                                    name: 'it',
                                                    __core: false,
                                                    __rest: false
                                                }],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'it',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'apply',
                                                                    __core: true,
                                                                    __rest: false
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'obj',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'args',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            ]
                                                        }
                                                    }]
                                            }
                                        },
                                        arguments: [{
                                                type: 'MemberExpression',
                                                computed: true,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'obj',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'prop',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            }]
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        keys: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'keys',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'Object',
                            __core: false,
                            __rest: false
                        },
                        property: {
                            type: 'Identifier',
                            name: 'keys',
                            __core: true,
                            __rest: false
                        }
                    }
                }
            }],
        values: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'values',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'map',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [{
                                                        type: 'Identifier',
                                                        name: 'k',
                                                        __core: false,
                                                        __rest: false
                                                    }],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'MemberExpression',
                                                                computed: true,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'x',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'k',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            }
                                                        }]
                                                }
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'keys',
                                                    __core: true,
                                                    __rest: false
                                                },
                                                arguments: [{
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __core: false,
                                                        __rest: false
                                                    }]
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        key: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'key',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'v',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'find',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [{
                                                        type: 'Identifier',
                                                        name: 'it',
                                                        __core: false,
                                                        __rest: false
                                                    }],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'BinaryExpression',
                                                                operator: '===',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'it',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'v',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            }
                                                        }]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        value: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'value',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'k',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'MemberExpression',
                                        computed: true,
                                        object: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'k',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        filter: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'filter',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'Array',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'prototype',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'filter',
                                                    __core: true,
                                                    __rest: false
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'call',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'f',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'arguments[0]',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }]
                                                            }
                                                        }]
                                                }
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        map: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'map',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'Array',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'prototype',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'map',
                                                    __core: true,
                                                    __rest: false
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'call',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'f',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'arguments[0]',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }]
                                                            }
                                                        }]
                                                }
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        foldl: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'foldl',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'SwitchStatement',
                                    discriminant: {
                                        type: 'Literal',
                                        value: false
                                    },
                                    cases: [
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 2
                                                    }
                                                }
                                            },
                                            consequent: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'ConditionalExpression',
                                                        test: {
                                                            type: 'BinaryExpression',
                                                            operator: '===',
                                                            left: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'vec',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'length',
                                                                    __core: true,
                                                                    __rest: false
                                                                }
                                                            },
                                                            right: {
                                                                type: 'Literal',
                                                                value: 0
                                                            }
                                                        },
                                                        consequent: {
                                                            type: 'ArrayExpression',
                                                            elements: []
                                                        },
                                                        alternate: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'Array',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'prototype',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'reduce',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'call',
                                                                    __core: true,
                                                                    __rest: false
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'vec',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                {
                                                                    type: 'FunctionExpression',
                                                                    id: null,
                                                                    params: [],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [{
                                                                                type: 'ReturnStatement',
                                                                                argument: {
                                                                                    type: 'CallExpression',
                                                                                    callee: {
                                                                                        type: 'Identifier',
                                                                                        name: 'f',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    },
                                                                                    arguments: [
                                                                                        {
                                                                                            type: 'Identifier',
                                                                                            name: 'arguments[0]',
                                                                                            __core: false,
                                                                                            __rest: false
                                                                                        },
                                                                                        {
                                                                                            type: 'Identifier',
                                                                                            name: 'arguments[1]',
                                                                                            __core: false,
                                                                                            __rest: false
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            }]
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                }]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: {
                                                type: 'UnaryExpression',
                                                operator: '!',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 3
                                                    }
                                                }
                                            },
                                            consequent: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'ConditionalExpression',
                                                        test: {
                                                            type: 'BinaryExpression',
                                                            operator: '===',
                                                            left: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'vec',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'length',
                                                                    __core: true,
                                                                    __rest: false
                                                                }
                                                            },
                                                            right: {
                                                                type: 'Literal',
                                                                value: 0
                                                            }
                                                        },
                                                        consequent: {
                                                            type: 'ArrayExpression',
                                                            elements: []
                                                        },
                                                        alternate: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'Array',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'prototype',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'reduce',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'call',
                                                                    __core: true,
                                                                    __rest: false
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'ArrayExpression',
                                                                            elements: [{
                                                                                    type: 'Identifier',
                                                                                    name: 'a',
                                                                                    __core: false,
                                                                                    __rest: false
                                                                                }]
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'concat',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'vec',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }]
                                                                },
                                                                {
                                                                    type: 'FunctionExpression',
                                                                    id: null,
                                                                    params: [],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [{
                                                                                type: 'ReturnStatement',
                                                                                argument: {
                                                                                    type: 'CallExpression',
                                                                                    callee: {
                                                                                        type: 'Identifier',
                                                                                        name: 'f',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    },
                                                                                    arguments: [
                                                                                        {
                                                                                            type: 'Identifier',
                                                                                            name: 'arguments[0]',
                                                                                            __core: false,
                                                                                            __rest: false
                                                                                        },
                                                                                        {
                                                                                            type: 'Identifier',
                                                                                            name: 'arguments[1]',
                                                                                            __core: false,
                                                                                            __rest: false
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            }]
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                }]
                                        }
                                    ]
                                }]
                        }
                    }
                }
            }],
        foldr: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'foldr',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '===',
                                            left: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'vec',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'length',
                                                    __core: true,
                                                    __rest: false
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 0
                                            }
                                        },
                                        consequent: {
                                            type: 'ArrayExpression',
                                            elements: []
                                        },
                                        alternate: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'reduceRight',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: true,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'vec',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'FunctionExpression',
                                                    id: null,
                                                    params: [],
                                                    body: {
                                                        type: 'BlockStatement',
                                                        body: [{
                                                                type: 'ReturnStatement',
                                                                argument: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'Identifier',
                                                                        name: 'f',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'arguments[0]',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'arguments[1]',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    ]
                                                                }
                                                            }]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        asyncmap: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'asyncmap',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'cb',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'count',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'results',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'next',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }
                                    ],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'count',
                                            __core: true,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'length',
                                                __core: true,
                                                __rest: false
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'results',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'ArrayExpression',
                                            elements: []
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'next',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'FunctionExpression',
                                            id: null,
                                            params: [{
                                                    type: 'Identifier',
                                                    name: 'i',
                                                    __core: false,
                                                    __rest: false
                                                }],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'FunctionExpression',
                                                            id: null,
                                                            params: [{
                                                                    type: 'Identifier',
                                                                    name: 'value',
                                                                    __core: true,
                                                                    __rest: false
                                                                }],
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [
                                                                    {
                                                                        type: 'ExpressionStatement',
                                                                        expression: {
                                                                            type: 'UpdateExpression',
                                                                            operator: '--',
                                                                            argument: {
                                                                                type: 'Identifier',
                                                                                name: 'count',
                                                                                __core: true,
                                                                                __rest: false
                                                                            },
                                                                            prefix: true
                                                                        }
                                                                    },
                                                                    {
                                                                        type: 'ExpressionStatement',
                                                                        expression: {
                                                                            type: 'AssignmentExpression',
                                                                            operator: '=',
                                                                            left: {
                                                                                type: 'MemberExpression',
                                                                                computed: true,
                                                                                object: {
                                                                                    type: 'Identifier',
                                                                                    name: 'results',
                                                                                    __core: false,
                                                                                    __rest: false
                                                                                },
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'i',
                                                                                    __core: false,
                                                                                    __rest: false
                                                                                }
                                                                            },
                                                                            right: {
                                                                                type: 'Identifier',
                                                                                name: 'value',
                                                                                __core: true,
                                                                                __rest: false
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        type: 'IfStatement',
                                                                        test: {
                                                                            type: 'BinaryExpression',
                                                                            operator: '===',
                                                                            left: {
                                                                                type: 'Identifier',
                                                                                name: 'count',
                                                                                __core: true,
                                                                                __rest: false
                                                                            },
                                                                            right: {
                                                                                type: 'Literal',
                                                                                value: 0
                                                                            }
                                                                        },
                                                                        consequent: {
                                                                            type: 'BlockStatement',
                                                                            body: [{
                                                                                    type: 'ReturnStatement',
                                                                                    argument: {
                                                                                        type: 'CallExpression',
                                                                                        callee: {
                                                                                            type: 'Identifier',
                                                                                            name: 'cb',
                                                                                            __core: false,
                                                                                            __rest: false
                                                                                        },
                                                                                        arguments: [{
                                                                                                type: 'Identifier',
                                                                                                name: 'results',
                                                                                                __core: false,
                                                                                                __rest: false
                                                                                            }]
                                                                                    }
                                                                                }]
                                                                        },
                                                                        alternate: null
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }]
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'forEach',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: [{
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'i',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'f',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    {
                                                                        type: 'CallExpression',
                                                                        callee: {
                                                                            type: 'Identifier',
                                                                            name: 'next',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        arguments: [{
                                                                                type: 'Identifier',
                                                                                name: 'i',
                                                                                __core: false,
                                                                                __rest: false
                                                                            }]
                                                                    }
                                                                ]
                                                            }
                                                        }]
                                                }
                                            }]
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        intersect: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'intersect',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec1',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec2',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'filter',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'BinaryExpression',
                                                                operator: '!==',
                                                                left: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'vec2',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'indexOf',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'arguments[0]',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }]
                                                                },
                                                                right: {
                                                                    type: 'UnaryExpression',
                                                                    operator: '-',
                                                                    argument: {
                                                                        type: 'Literal',
                                                                        value: 1
                                                                    }
                                                                }
                                                            }
                                                        }]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec1',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        max: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'max',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'foldl',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'ConditionalExpression',
                                                                test: {
                                                                    type: 'BinaryExpression',
                                                                    operator: '>',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    right: {
                                                                        type: 'Identifier',
                                                                        name: 'b',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                consequent: {
                                                                    type: 'Identifier',
                                                                    name: 'a',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                alternate: {
                                                                    type: 'Identifier',
                                                                    name: 'b',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            }
                                                        }]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        min: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'min',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'foldl',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'ConditionalExpression',
                                                                test: {
                                                                    type: 'BinaryExpression',
                                                                    operator: '<',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    right: {
                                                                        type: 'Identifier',
                                                                        name: 'b',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                consequent: {
                                                                    type: 'Identifier',
                                                                    name: 'a',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                alternate: {
                                                                    type: 'Identifier',
                                                                    name: 'b',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            }
                                                        }]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        nothing: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'nothing',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'filter',
                                                    __core: true,
                                                    __rest: false
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'f',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'vec',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                ]
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'length',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        randomize: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'randomize',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'sort',
                                            __core: false,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'BinaryExpression',
                                                                operator: '>',
                                                                left: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'Math',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'random',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    arguments: []
                                                                },
                                                                right: {
                                                                    type: 'Literal',
                                                                    value: 0.5
                                                                }
                                                            }
                                                        }]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        take: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'take',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'n',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'slice',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Literal',
                                                value: 0
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'n',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        drop: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'drop',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'n',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'slice',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: [{
                                                type: 'Identifier',
                                                name: 'n',
                                                __core: false,
                                                __rest: false
                                            }]
                                    }
                                }]
                        }
                    }
                }
            }],
        takeWhile: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'takeWhile',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: '_$fv',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'xs',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }
                                    ],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: true,
                                            object: {
                                                type: 'Identifier',
                                                name: '_$fv',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Literal',
                                                value: 0
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'xs',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: '_$fv',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'slice',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: '_$fv',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '===',
                                            left: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'f',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                arguments: [{
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __core: false,
                                                        __rest: false
                                                    }]
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: true
                                            }
                                        },
                                        consequent: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'ArrayExpression',
                                                    elements: [{
                                                            type: 'Identifier',
                                                            name: 'x',
                                                            __core: false,
                                                            __rest: false
                                                        }]
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'concat',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [{
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'takeWhile',
                                                        __core: true,
                                                        __rest: false
                                                    },
                                                    arguments: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'f',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'xs',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    ]
                                                }]
                                        },
                                        alternate: {
                                            type: 'ArrayExpression',
                                            elements: []
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        apply: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'apply',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __core: false,
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'args',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arguments',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'f',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'apply',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'args',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        compose: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'compose',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'g',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'FunctionExpression',
                                        id: null,
                                        params: [{
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            }],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'f',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        arguments: [{
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'g',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }]
                                                            }]
                                                    }
                                                }]
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        sequence: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'sequence',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'g',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'FunctionExpression',
                                        id: null,
                                        params: [{
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            }],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'g',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        arguments: [{
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'f',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }]
                                                            }]
                                                    }
                                                }]
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        id: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'id',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'a',
                                        __core: false,
                                        __rest: false
                                    }
                                }]
                        }
                    }
                }
            }],
        flip: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'flip',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'f',
                                            __core: false,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'b',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'a',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        partial: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'partial',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __core: false,
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'args',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arguments',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'FunctionExpression',
                                        id: null,
                                        params: [{
                                                type: 'Identifier',
                                                name: 'xargs',
                                                __core: false,
                                                __rest: true
                                            }],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'AssignmentExpression',
                                                        operator: '=',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'xargs',
                                                            __core: false,
                                                            __rest: true
                                                        },
                                                        right: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'Array',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'prototype',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'slice',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'call',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'arguments',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                {
                                                                    type: 'Literal',
                                                                    value: 0
                                                                },
                                                                {
                                                                    type: 'BinaryExpression',
                                                                    operator: '-',
                                                                    left: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'arguments',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'length',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 0
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'apply',
                                                                __core: true,
                                                                __rest: false
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'args',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'concat',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'xargs',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        partialr: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'partialr',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __core: false,
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'args',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arguments',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'FunctionExpression',
                                        id: null,
                                        params: [{
                                                type: 'Identifier',
                                                name: 'xargs',
                                                __core: false,
                                                __rest: true
                                            }],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'AssignmentExpression',
                                                        operator: '=',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'xargs',
                                                            __core: false,
                                                            __rest: true
                                                        },
                                                        right: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                computed: false,
                                                                object: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'Array',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'prototype',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'slice',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'call',
                                                                    __core: false,
                                                                    __rest: false
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'arguments',
                                                                    __core: false,
                                                                    __rest: false
                                                                },
                                                                {
                                                                    type: 'Literal',
                                                                    value: 0
                                                                },
                                                                {
                                                                    type: 'BinaryExpression',
                                                                    operator: '-',
                                                                    left: {
                                                                        type: 'MemberExpression',
                                                                        computed: false,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'arguments',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'length',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 0
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'apply',
                                                                __core: true,
                                                                __rest: false
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'xargs',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'concat',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                arguments: [{
                                                                        type: 'Identifier',
                                                                        name: 'args',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        curry: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'curry',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'l',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'c',
                                                __core: false,
                                                __rest: false
                                            },
                                            init: null
                                        }
                                    ],
                                    kind: 'var'
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'l',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'f',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'length',
                                                __core: true,
                                                __rest: false
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'c',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'FunctionExpression',
                                            id: null,
                                            params: [{
                                                    type: 'Identifier',
                                                    name: 'args',
                                                    __core: false,
                                                    __rest: false
                                                }],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'FunctionExpression',
                                                            id: null,
                                                            params: [{
                                                                    type: 'Identifier',
                                                                    name: 'arg',
                                                                    __core: false,
                                                                    __rest: true
                                                                }],
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [
                                                                    {
                                                                        type: 'VariableDeclaration',
                                                                        declarations: [{
                                                                                type: 'VariableDeclarator',
                                                                                id: {
                                                                                    type: 'Identifier',
                                                                                    name: 'xargs',
                                                                                    __core: false,
                                                                                    __rest: false
                                                                                },
                                                                                init: null
                                                                            }],
                                                                        kind: 'var'
                                                                    },
                                                                    {
                                                                        type: 'ExpressionStatement',
                                                                        expression: {
                                                                            type: 'AssignmentExpression',
                                                                            operator: '=',
                                                                            left: {
                                                                                type: 'Identifier',
                                                                                name: 'arg',
                                                                                __core: false,
                                                                                __rest: true
                                                                            },
                                                                            right: {
                                                                                type: 'CallExpression',
                                                                                callee: {
                                                                                    type: 'MemberExpression',
                                                                                    computed: false,
                                                                                    object: {
                                                                                        type: 'MemberExpression',
                                                                                        computed: false,
                                                                                        object: {
                                                                                            type: 'MemberExpression',
                                                                                            computed: false,
                                                                                            object: {
                                                                                                type: 'Identifier',
                                                                                                name: 'Array',
                                                                                                __core: false,
                                                                                                __rest: false
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'prototype',
                                                                                                __core: false,
                                                                                                __rest: false
                                                                                            }
                                                                                        },
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'slice',
                                                                                            __core: false,
                                                                                            __rest: false
                                                                                        }
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'call',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    }
                                                                                },
                                                                                arguments: [
                                                                                    {
                                                                                        type: 'Identifier',
                                                                                        name: 'arguments',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    },
                                                                                    {
                                                                                        type: 'Literal',
                                                                                        value: 0
                                                                                    },
                                                                                    {
                                                                                        type: 'BinaryExpression',
                                                                                        operator: '-',
                                                                                        left: {
                                                                                            type: 'MemberExpression',
                                                                                            computed: false,
                                                                                            object: {
                                                                                                type: 'Identifier',
                                                                                                name: 'arguments',
                                                                                                __core: false,
                                                                                                __rest: false
                                                                                            },
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'length',
                                                                                                __core: false,
                                                                                                __rest: false
                                                                                            }
                                                                                        },
                                                                                        right: {
                                                                                            type: 'Literal',
                                                                                            value: 0
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        type: 'ExpressionStatement',
                                                                        expression: {
                                                                            type: 'AssignmentExpression',
                                                                            operator: '=',
                                                                            left: {
                                                                                type: 'Identifier',
                                                                                name: 'xargs',
                                                                                __core: false,
                                                                                __rest: false
                                                                            },
                                                                            right: {
                                                                                type: 'CallExpression',
                                                                                callee: {
                                                                                    type: 'MemberExpression',
                                                                                    computed: false,
                                                                                    object: {
                                                                                        type: 'Identifier',
                                                                                        name: 'args',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'concat',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    }
                                                                                },
                                                                                arguments: [{
                                                                                        type: 'Identifier',
                                                                                        name: 'arg',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    }]
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        type: 'ReturnStatement',
                                                                        argument: {
                                                                            type: 'ConditionalExpression',
                                                                            test: {
                                                                                type: 'BinaryExpression',
                                                                                operator: '<',
                                                                                left: {
                                                                                    type: 'MemberExpression',
                                                                                    computed: false,
                                                                                    object: {
                                                                                        type: 'Identifier',
                                                                                        name: 'xargs',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'length',
                                                                                        __core: true,
                                                                                        __rest: false
                                                                                    }
                                                                                },
                                                                                right: {
                                                                                    type: 'Identifier',
                                                                                    name: 'l',
                                                                                    __core: false,
                                                                                    __rest: false
                                                                                }
                                                                            },
                                                                            consequent: {
                                                                                type: 'CallExpression',
                                                                                callee: {
                                                                                    type: 'Identifier',
                                                                                    name: 'c',
                                                                                    __core: false,
                                                                                    __rest: false
                                                                                },
                                                                                arguments: [{
                                                                                        type: 'Identifier',
                                                                                        name: 'xargs',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    }]
                                                                            },
                                                                            alternate: {
                                                                                type: 'CallExpression',
                                                                                callee: {
                                                                                    type: 'MemberExpression',
                                                                                    computed: false,
                                                                                    object: {
                                                                                        type: 'Identifier',
                                                                                        name: 'f',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    },
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'apply',
                                                                                        __core: true,
                                                                                        __rest: false
                                                                                    }
                                                                                },
                                                                                arguments: [
                                                                                    {
                                                                                        type: 'Identifier',
                                                                                        name: 'f',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    },
                                                                                    {
                                                                                        type: 'Identifier',
                                                                                        name: 'xargs',
                                                                                        __core: false,
                                                                                        __rest: false
                                                                                    }
                                                                                ]
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    }]
                                            }
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'BinaryExpression',
                                            operator: '<',
                                            left: {
                                                type: 'Identifier',
                                                name: 'l',
                                                __core: false,
                                                __rest: false
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 1
                                            }
                                        },
                                        consequent: {
                                            type: 'Identifier',
                                            name: 'f',
                                            __core: false,
                                            __rest: false
                                        },
                                        alternate: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'c',
                                                __core: false,
                                                __rest: false
                                            },
                                            arguments: [{
                                                    type: 'ArrayExpression',
                                                    elements: []
                                                }]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        bind: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bind',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __core: false,
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'args',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arguments',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: 1
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'FunctionExpression',
                                        id: null,
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'apply',
                                                                __core: true,
                                                                __rest: false
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __core: false,
                                                                __rest: false
                                                            },
                                                            {
                                                                type: 'Identifier',
                                                                name: 'args',
                                                                __core: false,
                                                                __rest: false
                                                            }
                                                        ]
                                                    }
                                                }]
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        If: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'If',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'yn',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'Identifier',
                                            name: 'yn',
                                            __core: false,
                                            __rest: false
                                        },
                                        consequent: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'f',
                                                __core: false,
                                                __rest: false
                                            },
                                            arguments: []
                                        },
                                        alternate: {
                                            type: 'Literal',
                                            value: null
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        when: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'when',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'isTrue',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'callback',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Identifier',
                                        name: 'isTrue',
                                        __core: false,
                                        __rest: false
                                    },
                                    consequent: {
                                        type: 'BlockStatement',
                                        body: [{
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'callback',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    arguments: []
                                                }
                                            }]
                                    },
                                    alternate: null
                                }]
                        }
                    }
                }
            }],
        maybeSeq: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'maybeSeq',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'args',
                                __core: false,
                                __rest: true
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'args',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arguments',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: 0
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'foldl',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'ConditionalExpression',
                                                                test: {
                                                                    type: 'BinaryExpression',
                                                                    operator: '===',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: null
                                                                    }
                                                                },
                                                                consequent: {
                                                                    type: 'Literal',
                                                                    value: null
                                                                },
                                                                alternate: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'Identifier',
                                                                        name: 'b',
                                                                        __core: false,
                                                                        __rest: false
                                                                    },
                                                                    arguments: [{
                                                                            type: 'Identifier',
                                                                            name: 'a',
                                                                            __core: false,
                                                                            __rest: false
                                                                        }]
                                                                }
                                                            }
                                                        }]
                                                }
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'ArrayExpression',
                                                        elements: [{
                                                                type: 'Literal',
                                                                value: true
                                                            }]
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'concat',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Identifier',
                                                        name: 'args',
                                                        __core: false,
                                                        __rest: false
                                                    }]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        show: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'show',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'i',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'i',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'toString',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: []
                                    }
                                }]
                        }
                    }
                }
            }],
        mod: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'mod',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '%',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        bitAnd: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitAnd',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '&',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        bitOr: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitOr',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '|',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        bitXor: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitXor',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '^',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        bitShiftl: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitShiftl',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '<<',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        bitShiftr: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitShiftr',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>>',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        bitUshiftr: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitUshiftr',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>>>',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        square: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'square',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '*',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        sum: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'sum',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        sub: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'sub',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '-',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        prod: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'prod',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '*',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        div: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'div',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '/',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __core: false,
                                            __rest: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        even: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'even',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'n',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'BinaryExpression',
                                            operator: '%',
                                            left: {
                                                type: 'Identifier',
                                                name: 'n',
                                                __core: false,
                                                __rest: false
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 2
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        odd: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'odd',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'n',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '!==',
                                        left: {
                                            type: 'BinaryExpression',
                                            operator: '%',
                                            left: {
                                                type: 'Identifier',
                                                name: 'n',
                                                __core: false,
                                                __rest: false
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 2
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        abs: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'abs',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'n',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'Math',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'abs',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: [{
                                                type: 'Identifier',
                                                name: 'n',
                                                __core: false,
                                                __rest: false
                                            }]
                                    }
                                }]
                        }
                    }
                }
            }],
        sqrt: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'sqrt',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'n',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'Math',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'sqrt',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: [{
                                                type: 'Identifier',
                                                name: 'n',
                                                __core: false,
                                                __rest: false
                                            }]
                                    }
                                }]
                        }
                    }
                }
            }],
        pow: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'pow',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'Math',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'pow',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'a',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'b',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        inc: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'inc',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        dec: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'dec',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '-',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        false$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'false$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: false
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        true$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'true$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: true
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        pos$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'pos$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        neg$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'neg$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '<',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        zero$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'zero$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        num$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'num$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Object',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toString',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [{
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    __core: false,
                                                    __rest: false
                                                }]
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: '[object Number]'
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        str$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'str$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Object',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toString',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [{
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    __core: false,
                                                    __rest: false
                                                }]
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: '[object String]'
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        map$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'map$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Object',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toString',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [{
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    __core: false,
                                                    __rest: false
                                                }]
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: '[object Object]'
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        vector$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'vector$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Object',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toString',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [{
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    __core: false,
                                                    __rest: false
                                                }]
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: '[object Array]'
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        bool$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bool$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'LogicalExpression',
                                        operator: '||',
                                        left: {
                                            type: 'BinaryExpression',
                                            operator: '===',
                                            left: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: true
                                            }
                                        },
                                        right: {
                                            type: 'BinaryExpression',
                                            operator: '===',
                                            left: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __core: false,
                                                __rest: false
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: false
                                            }
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        none$QUOT: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'none$QUOT',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __core: false,
                                            __rest: false
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: null
                                        }
                                    }
                                }]
                        }
                    }
                }
            }],
        camelize: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'camelize',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'str',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'str',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'replace',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Literal',
                                                value: /(-|_)+([a-zA-Z0-9$_])/g
                                            },
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [{
                                                        type: 'Identifier',
                                                        name: 'i',
                                                        __core: false,
                                                        __rest: false
                                                    }],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [{
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        computed: true,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'i',
                                                                            __core: false,
                                                                            __rest: false
                                                                        },
                                                                        property: {
                                                                            type: 'Literal',
                                                                            value: 1
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'toUpperCase',
                                                                        __core: false,
                                                                        __rest: false
                                                                    }
                                                                },
                                                                arguments: []
                                                            }
                                                        }]
                                                }
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        uppercase: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'uppercase',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'str',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'str',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'toUpperCase',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: []
                                    }
                                }]
                        }
                    }
                }
            }],
        stringify: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'stringify',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'args',
                                __core: false,
                                __rest: true
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'args',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arguments',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: 0
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'foldl',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'concat',
                                                __core: true,
                                                __rest: false
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'args',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }],
        capitalize: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'capitalize',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'str',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: true,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'str',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Literal',
                                                            value: 0
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toUpperCase',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                arguments: []
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'concat',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: [{
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'str',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Literal',
                                                        value: 1
                                                    }]
                                            }]
                                    }
                                }]
                        }
                    }
                }
            }],
        chars: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'chars',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'str',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'map',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'str',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'split',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Literal',
                                                        value: ''
                                                    }]
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        condense: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'condense',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'str',
                                __core: false,
                                __rest: false
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'str',
                                                __core: false,
                                                __rest: false
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'replace',
                                                __core: false,
                                                __rest: false
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Literal',
                                                value: /\ /g
                                            },
                                            {
                                                type: 'Literal',
                                                value: ''
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        lines: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'lines',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'str',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'map',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'str',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'split',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Literal',
                                                        value: '\n'
                                                    }]
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        words: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'words',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __core: false,
                                __rest: false
                            },
                            {
                                type: 'Identifier',
                                name: 'str',
                                __core: false,
                                __rest: false
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'map',
                                            __core: true,
                                            __rest: false
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'str',
                                                        __core: false,
                                                        __rest: false
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'split',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                arguments: [{
                                                        type: 'Literal',
                                                        value: ' '
                                                    }]
                                            }
                                        ]
                                    }
                                }]
                        }
                    }
                }
            }],
        print: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'print',
                        __core: true,
                        __rest: false
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'args',
                                __core: false,
                                __rest: true
                            }],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        operator: '=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'args',
                                            __core: false,
                                            __rest: true
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'Array',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __core: false,
                                                        __rest: false
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arguments',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                {
                                                    type: 'Literal',
                                                    value: 0
                                                },
                                                {
                                                    type: 'BinaryExpression',
                                                    operator: '-',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'arguments',
                                                            __core: false,
                                                            __rest: false
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __core: false,
                                                            __rest: false
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'MemberExpression',
                                                computed: false,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'console',
                                                    __core: false,
                                                    __rest: false
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'log',
                                                    __core: false,
                                                    __rest: false
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'apply',
                                                __core: true,
                                                __rest: false
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'console',
                                                __core: false,
                                                __rest: false
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'args',
                                                __core: false,
                                                __rest: false
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }]
    };
}());