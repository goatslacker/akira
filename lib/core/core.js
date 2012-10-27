module.exports = (function ($$export) {
    var eq, neq, gt, lt, gte, lte, and, or, head, init, tail, last, get, length, join, concat, count, average, compact, assert, assertDeep, find, call, keys, values, key, value, filter, map, foldl, foldr, intersect, max, min, nothing, randomize, unique, take, drop, takeWhile, apply, id, flip, partial, partialr, when, show, mod, bitAnd, bitOr, bitXor, bitShiftl, bitShiftr, bitUshiftr, square, sum, sub, prod, div, even, odd, abs, sqrt, pow, inc, dec, false$QUOT, true$QUOT, pos$QUOT, neg$QUOT, zero$QUOT, str$QUOT, map$QUOT, vector$QUOT, none$QUOT, camelize, uppercase, capitalize, chars, condense, lines, words, print;
    return {
        eq: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'eq',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        neq: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'neq',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '!==',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        gt: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'gt',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        lt: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'lt',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '<',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        gte: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'gte',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        lte: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'lte',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '<=',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        and: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'and',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '&&',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        or: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'or',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '||',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        head: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'head',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: '$$vec0'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    kind: 'var',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: '$$offset0'
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '0'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __rest: undefined
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec0[$$offset0++]'
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'x',
                                        __rest: undefined
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        init: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'init',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: '$$vec0'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    kind: 'var',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: '$$offset0'
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '0'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'xs',
                                                __rest: true
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec0.slice(0, ($$offset0 = ($$vec0.length - 1)))'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __rest: undefined
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec0[$$offset0++]'
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'xs',
                                        __rest: undefined
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        tail: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'tail',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: '$$vec0'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    kind: 'var',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: '$$offset0'
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '0'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __rest: undefined
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec0[$$offset0++]'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'xs',
                                                __rest: true
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec0.slice(1, ($$offset0 = ($$vec0.length - 0)))'
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'xs',
                                        __rest: undefined
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        last: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'last',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: '$$vec0'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    kind: 'var',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: '$$offset0'
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '0'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'xs',
                                                __rest: true
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec0.slice(0, ($$offset0 = ($$vec0.length - 1)))'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __rest: undefined
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec0[$$offset0++]'
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'x',
                                        __rest: undefined
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        get: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'get',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'obj',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'prop',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'MemberExpression',
                                        computed: true,
                                        object: {
                                            type: 'Identifier',
                                            name: 'obj',
                                            __rest: undefined
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'prop',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        length: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'length',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'of',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'MemberExpression',
                                        computed: false,
                                        object: {
                                            type: 'Identifier',
                                            name: 'of',
                                            __rest: undefined
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'length',
                                            __rest: undefined,
                                            __core: true
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        join: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'join',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'by',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
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
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'join',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'by',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        concat: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'concat',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'args',
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'args',
                                        __rest: true
                                    },
                                    init: {
                                        type: 'Identifier',
                                        name: 'Array.prototype.slice.call(arguments, 0)'
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'foldl',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __rest: undefined
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
                                                                        __rest: undefined
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'concat'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'b',
                                                                        __rest: undefined
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'args',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        count: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'count',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
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
                                                    type: 'UnaryExpression',
                                                    operator: '!',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'f',
                                                        __rest: undefined
                                                    }
                                                }
                                            },
                                            consequent: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'vec',
                                                            __rest: undefined
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __rest: undefined,
                                                            __core: true
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: null,
                                            consequent: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'MemberExpression',
                                                        computed: false,
                                                        object: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'filter',
                                                                __rest: undefined,
                                                                __core: true
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'f',
                                                                    __rest: undefined
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'vec',
                                                                    __rest: undefined
                                                                }
                                                            ]
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'length',
                                                            __rest: undefined,
                                                            __core: true
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        ],
        average: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'average',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '/',
                                        left: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'foldl',
                                                __rest: undefined,
                                                __core: true
                                            },
                                            arguments: [
                                                {
                                                    type: 'FunctionExpression',
                                                    id: null,
                                                    params: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'a',
                                                            __rest: undefined
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'b',
                                                            __rest: undefined
                                                        }
                                                    ],
                                                    body: {
                                                        type: 'BlockStatement',
                                                        body: [
                                                            {
                                                                type: 'ReturnStatement',
                                                                argument: {
                                                                    type: 'BinaryExpression',
                                                                    operator: '+',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
                                                                        __rest: undefined
                                                                    },
                                                                    right: {
                                                                        type: 'Identifier',
                                                                        name: 'b',
                                                                        __rest: undefined
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'vec',
                                                    __rest: undefined
                                                }
                                            ]
                                        },
                                        right: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'length',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        compact: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'compact',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'filter',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'UnaryExpression',
                                                                operator: '!',
                                                                argument: {
                                                                    type: 'UnaryExpression',
                                                                    operator: '!',
                                                                    argument: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        __rest: undefined
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        assert: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'assert',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
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
                                                    operator: '!==',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __rest: undefined
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        __rest: undefined
                                                    }
                                                }
                                            },
                                            consequent: [
                                                {
                                                    type: 'ThrowStatement',
                                                    argument: {
                                                        type: 'NewExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'Error'
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'ArrayExpression',
                                                                elements: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'a',
                                                                        __rest: undefined
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'b',
                                                                        __rest: undefined
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: null,
                                            consequent: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Literal',
                                                        value: null
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        ],
        assertDeep: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'assertDeep',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'filter',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __rest: undefined
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'i',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'assert',
                                                                    __rest: undefined,
                                                                    __core: true
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        __rest: undefined
                                                                    },
                                                                    {
                                                                        type: 'MemberExpression',
                                                                        computed: true,
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'b',
                                                                            __rest: undefined
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'i',
                                                                            __rest: undefined
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'a',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        find: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'find',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'ds',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ForInStatement',
                                    left: {
                                        type: 'VariableDeclaration',
                                        declarations: [
                                            {
                                                type: 'VariableDeclarator',
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'i'
                                                },
                                                init: null
                                            }
                                        ],
                                        kind: 'var'
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'ds'
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'IfStatement',
                                                test: {
                                                    type: 'BinaryExpression',
                                                    operator: '===',
                                                    left: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'f'
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'MemberExpression',
                                                                computed: true,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'ds'
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'i'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: true
                                                    }
                                                },
                                                consequent: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'Identifier',
                                                                name: 'i'
                                                            }
                                                        }
                                                    ]
                                                },
                                                alternate: null
                                            }
                                        ]
                                    },
                                    each: false
                                }
                            ]
                        }
                    }
                }
            }
        ],
        call: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'call',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'obj',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'prop',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'args',
                                        __rest: true
                                    },
                                    init: {
                                        type: 'Identifier',
                                        name: 'Array.prototype.slice.call(arguments, 2)'
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
                                                computed: true,
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'obj',
                                                    __rest: undefined
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'prop',
                                                    __rest: undefined
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'apply',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'obj',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'args',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        keys: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'keys',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'Object',
                            __rest: undefined
                        },
                        property: {
                            type: 'Identifier',
                            name: 'keys',
                            __rest: undefined,
                            __core: true
                        }
                    }
                }
            }
        ],
        values: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'values',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'map',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'k',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'MemberExpression',
                                                                computed: true,
                                                                object: {
                                                                    type: 'Identifier',
                                                                    name: 'x',
                                                                    __rest: undefined
                                                                },
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'k',
                                                                    __rest: undefined
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'keys',
                                                    __rest: undefined,
                                                    __core: true
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __rest: undefined
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        key: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'key',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'v',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'find',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'it'
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'BinaryExpression',
                                                                operator: '===',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'it'
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'v',
                                                                    __rest: undefined
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'x',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        value: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'value',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'k',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'MemberExpression',
                                        computed: true,
                                        object: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        property: {
                                            type: 'Identifier',
                                            name: 'k',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        filter: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'filter',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
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
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'Array',
                                                        __rest: undefined
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'prototype'
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'filter',
                                                    __rest: undefined,
                                                    __core: true
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'call',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        map: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'map',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
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
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'Array',
                                                        __rest: undefined
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'prototype'
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'map',
                                                    __rest: undefined,
                                                    __core: true
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'call',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        foldl: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'foldl',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
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
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'Array',
                                                        __rest: undefined
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'prototype'
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'reduce',
                                                    __rest: undefined
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'call',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        foldr: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'foldr',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
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
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'Array',
                                                        __rest: undefined
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'prototype'
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'reduceRight',
                                                    __rest: undefined
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'call',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        intersect: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'intersect',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec1',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec2',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'filter',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
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
                                                                            __rest: undefined
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'indexOf',
                                                                            __rest: undefined
                                                                        }
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'x',
                                                                            __rest: undefined
                                                                        }
                                                                    ]
                                                                },
                                                                right: {
                                                                    type: 'BinaryExpression',
                                                                    operator: '-',
                                                                    left: {
                                                                        type: 'Literal',
                                                                        value: 0
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 1
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec1',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        max: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'max',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'foldl',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __rest: undefined
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'IfStatement',
                                                            test: {
                                                                type: 'BinaryExpression',
                                                                operator: '>',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'a',
                                                                    __rest: undefined
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'b',
                                                                    __rest: undefined
                                                                }
                                                            },
                                                            consequent: {
                                                                type: 'BlockStatement',
                                                                body: [
                                                                    {
                                                                        type: 'ReturnStatement',
                                                                        argument: {
                                                                            type: 'Identifier',
                                                                            name: 'a',
                                                                            __rest: undefined
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            alternate: {
                                                                type: 'BlockStatement',
                                                                body: [
                                                                    {
                                                                        type: 'ReturnStatement',
                                                                        argument: {
                                                                            type: 'Identifier',
                                                                            name: 'b',
                                                                            __rest: undefined
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        min: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'min',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'foldl',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        __rest: undefined
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'IfStatement',
                                                            test: {
                                                                type: 'BinaryExpression',
                                                                operator: '<',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'a',
                                                                    __rest: undefined
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'b',
                                                                    __rest: undefined
                                                                }
                                                            },
                                                            consequent: {
                                                                type: 'BlockStatement',
                                                                body: [
                                                                    {
                                                                        type: 'ReturnStatement',
                                                                        argument: {
                                                                            type: 'Identifier',
                                                                            name: 'a',
                                                                            __rest: undefined
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            alternate: {
                                                                type: 'BlockStatement',
                                                                body: [
                                                                    {
                                                                        type: 'ReturnStatement',
                                                                        argument: {
                                                                            type: 'Identifier',
                                                                            name: 'b',
                                                                            __rest: undefined
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        nothing: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'nothing',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
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
                                                    __rest: undefined,
                                                    __core: true
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'f',
                                                        __rest: undefined
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'vec',
                                                        __rest: undefined
                                                    }
                                                ]
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'length',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        randomize: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'randomize',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'sort',
                                            __rest: undefined
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
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
                                                                            __rest: undefined
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'random',
                                                                            __rest: undefined
                                                                        }
                                                                    },
                                                                    arguments: []
                                                                },
                                                                right: {
                                                                    type: 'Literal',
                                                                    value: 0.5
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        unique: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'unique',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'filter',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'FunctionExpression',
                                                id: null,
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        __rest: undefined
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'i',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
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
                                                                            type: 'Identifier',
                                                                            name: 'vec',
                                                                            __rest: undefined
                                                                        },
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'indexOf',
                                                                            __rest: undefined
                                                                        }
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'x',
                                                                            __rest: undefined
                                                                        }
                                                                    ]
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'i',
                                                                    __rest: undefined
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'vec',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        take: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'take',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'n',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
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
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'slice',
                                                __rest: undefined
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
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        drop: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'drop',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'n',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'vec',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
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
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'slice',
                                                __rest: undefined
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'n',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        takeWhile: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'takeWhile',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: '$$vec1'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclaration',
                                    kind: 'var',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: '$$offset1'
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '0'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
                                                __rest: undefined
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec1[$$offset1++]'
                                            }
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'xs',
                                                __rest: true
                                            },
                                            init: {
                                                type: 'Identifier',
                                                name: '$$vec1.slice(1, ($$offset1 = ($$vec1.length - 0)))'
                                            }
                                        }
                                    ]
                                },
                                {
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
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'f',
                                                            __rest: undefined
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'x',
                                                                __rest: undefined
                                                            }
                                                        ]
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: true
                                                    }
                                                }
                                            },
                                            consequent: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            computed: false,
                                                            object: {
                                                                type: 'ArrayExpression',
                                                                elements: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        __rest: undefined
                                                                    }
                                                                ]
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'concat'
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'takeWhile',
                                                                    __rest: undefined,
                                                                    __core: true
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'f',
                                                                        __rest: undefined
                                                                    },
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'xs',
                                                                        __rest: undefined
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            type: 'SwitchCase',
                                            test: null,
                                            consequent: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'ArrayExpression',
                                                        elements: []
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        ],
        apply: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'apply',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'args',
                                        __rest: true
                                    },
                                    init: {
                                        type: 'Identifier',
                                        name: 'Array.prototype.slice.call(arguments, 1)'
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
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'apply',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'args',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        id: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'id',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'a',
                                        __rest: undefined
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        flip: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'flip',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'f',
                                            __rest: undefined
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'b',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'a',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        partial: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'partial',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'args',
                                        __rest: true
                                    },
                                    init: {
                                        type: 'Identifier',
                                        name: 'Array.prototype.slice.call(arguments, 1)'
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'FunctionExpression',
                                        id: null,
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'xargs',
                                                __rest: true
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'xargs',
                                                        __rest: true
                                                    },
                                                    init: {
                                                        type: 'Identifier',
                                                        name: 'Array.prototype.slice.call(arguments, 0)'
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
                                                                __rest: undefined
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'apply',
                                                                __rest: undefined,
                                                                __core: true
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __rest: undefined
                                                            },
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'args',
                                                                        __rest: undefined
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'concat'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'xargs',
                                                                        __rest: undefined
                                                                    }
                                                                ]
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
            }
        ],
        partialr: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'partialr',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'args',
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'args',
                                        __rest: true
                                    },
                                    init: {
                                        type: 'Identifier',
                                        name: 'Array.prototype.slice.call(arguments, 1)'
                                    }
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'FunctionExpression',
                                        id: null,
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'xargs',
                                                __rest: true
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'VariableDeclarator',
                                                    id: {
                                                        type: 'Identifier',
                                                        name: 'xargs',
                                                        __rest: true
                                                    },
                                                    init: {
                                                        type: 'Identifier',
                                                        name: 'Array.prototype.slice.call(arguments, 0)'
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
                                                                __rest: undefined
                                                            },
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'apply',
                                                                __rest: undefined,
                                                                __core: true
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'f',
                                                                __rest: undefined
                                                            },
                                                            {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'xargs',
                                                                        __rest: undefined
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'concat'
                                                                    }
                                                                },
                                                                arguments: [
                                                                    {
                                                                        type: 'Identifier',
                                                                        name: 'args',
                                                                        __rest: undefined
                                                                    }
                                                                ]
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
            }
        ],
        when: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'when',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'isTrue',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'callback',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Identifier',
                                        name: 'isTrue'
                                    },
                                    consequent: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'callback'
                                                    },
                                                    arguments: []
                                                }
                                            }
                                        ]
                                    },
                                    alternate: null
                                }
                            ]
                        }
                    }
                }
            }
        ],
        show: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'show',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'i',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'i',
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'toString',
                                                __rest: undefined
                                            }
                                        },
                                        arguments: []
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        mod: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'mod',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '%',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        bitAnd: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitAnd',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '&',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        bitOr: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitOr',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '|',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        bitXor: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitXor',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '^',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        bitShiftl: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitShiftl',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '<<',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        bitShiftr: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitShiftr',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>>',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        bitUshiftr: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'bitUshiftr',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>>>',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a'
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        square: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'square',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '*',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        sum: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'sum',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        sub: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'sub',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '-',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        prod: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'prod',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '*',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        div: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'div',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '/',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'b',
                                            __rest: undefined
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        even: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'even',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'n',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'BinaryExpression',
                                            operator: '%',
                                            left: {
                                                type: 'Identifier',
                                                name: 'n'
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
                                }
                            ]
                        }
                    }
                }
            }
        ],
        odd: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'odd',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'n',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '!==',
                                        left: {
                                            type: 'BinaryExpression',
                                            operator: '%',
                                            left: {
                                                type: 'Identifier',
                                                name: 'n'
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
                                }
                            ]
                        }
                    }
                }
            }
        ],
        abs: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'abs',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'n',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'Math',
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'abs',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'n',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        sqrt: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'sqrt',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'n',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'Math',
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'sqrt',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'n',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        pow: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'pow',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'Math',
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'pow',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'a',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'b',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        inc: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'inc',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        dec: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'dec',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '-',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        false$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'false$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: false
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        true$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'true$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: true
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        pos$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'pos$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '>',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        neg$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'neg$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '<',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        zero$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'zero$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        str$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'str$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
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
                                                            name: 'Object'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype'
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toString'
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call'
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    __rest: undefined
                                                }
                                            ]
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: '[object String]'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        map$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'map$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
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
                                                            name: 'Object'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype'
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toString'
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call'
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    __rest: undefined
                                                }
                                            ]
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: '[object Object]'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        vector$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'vector$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
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
                                                            name: 'Object'
                                                        },
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'prototype'
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toString'
                                                    }
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'call'
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    __rest: undefined
                                                }
                                            ]
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: '[object Array]'
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        none$QUOT: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'none$QUOT',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'x',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        operator: '===',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            __rest: undefined
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: null
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        camelize: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'camelize',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'str',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'str',
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'replace',
                                                __rest: undefined
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
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'i',
                                                        __rest: undefined
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
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
                                                                            __rest: undefined
                                                                        },
                                                                        property: {
                                                                            type: 'Literal',
                                                                            value: 1
                                                                        }
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'toUpperCase',
                                                                        __rest: undefined
                                                                    }
                                                                },
                                                                arguments: []
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        uppercase: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'uppercase',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'str',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'str',
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'toUpperCase',
                                                __rest: undefined
                                            }
                                        },
                                        arguments: []
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        capitalize: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'capitalize',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'str',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
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
                                                            __rest: undefined
                                                        },
                                                        property: {
                                                            type: 'Literal',
                                                            value: 0
                                                        }
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'toUpperCase',
                                                        __rest: undefined
                                                    }
                                                },
                                                arguments: []
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'concat'
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'str',
                                                        __rest: undefined
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'slice',
                                                        __rest: undefined
                                                    }
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Literal',
                                                        value: 1
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        chars: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'chars',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'str',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'map',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'str',
                                                        __rest: undefined
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'split',
                                                        __rest: undefined
                                                    }
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Literal',
                                                        value: ''
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        condense: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'condense',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'str',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'MemberExpression',
                                            computed: false,
                                            object: {
                                                type: 'Identifier',
                                                name: 'str',
                                                __rest: undefined
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'replace',
                                                __rest: undefined
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
                                }
                            ]
                        }
                    }
                }
            }
        ],
        lines: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'lines',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'str',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'map',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'str',
                                                        __rest: undefined
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'split',
                                                        __rest: undefined
                                                    }
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Literal',
                                                        value: '\\n'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        words: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'words',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'f',
                                __rest: undefined
                            },
                            {
                                type: 'Identifier',
                                name: 'str',
                                __rest: undefined
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'map',
                                            __rest: undefined,
                                            __core: true
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'f',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'str',
                                                        __rest: undefined
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'split',
                                                        __rest: undefined
                                                    }
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Literal',
                                                        value: ' '
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ],
        print: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                        type: 'Identifier',
                        name: 'print',
                        __rest: undefined,
                        __core: true
                    },
                    right: {
                        type: 'FunctionExpression',
                        id: null,
                        params: [
                            {
                                type: 'Identifier',
                                name: 'args',
                                __rest: true
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'VariableDeclarator',
                                    id: {
                                        type: 'Identifier',
                                        name: 'args',
                                        __rest: true
                                    },
                                    init: {
                                        type: 'Identifier',
                                        name: 'Array.prototype.slice.call(arguments, 0)'
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
                                                    __rest: undefined
                                                },
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'log',
                                                    __rest: undefined
                                                }
                                            },
                                            property: {
                                                type: 'Identifier',
                                                name: 'apply',
                                                __rest: undefined,
                                                __core: true
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Identifier',
                                                name: 'console',
                                                __rest: undefined
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'args',
                                                __rest: undefined
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        ]
    };
}());