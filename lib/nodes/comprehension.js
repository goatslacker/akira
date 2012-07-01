var Base = require('./base');

function Comprehension(from, to, fn) {
  this.from = from;
  this.to = to;
  this.fn = fn;
  return this;
}

Comprehension.prototype.compile = function (context) {
return { type: 'CallExpression',
          callee:
           { type: 'FunctionExpression',
             id: null,
             params: [],
             body:
              { type: 'BlockStatement',
                body:
                 [ { type: 'VariableDeclaration',
                     declarations:
                      [{
                        type: 'VariableDeclarator',
                        id: { type: 'Identifier', name: '$$res' },
                        init: { type: 'ArrayExpression', elements: [] }
                      }, {
                        type: 'VariableDeclarator',
                        id: { type: 'Identifier', name: '$$fn' },
                        init: Base.compileValue(this.fn, context)
                      }],
                     kind: 'var' },
                   { type: 'ForStatement',
                     init:
                      { type: 'VariableDeclaration',
                        declarations:
                         [ { type: 'VariableDeclarator',
                             id: { type: 'Identifier', name: 'i' },
                             init: Base.compileValue(this.from, context) } ],
                        kind: 'var' },
                     test:
                      { type: 'BinaryExpression',
                        operator: '<=',
                        left: { type: 'Identifier', name: 'i' },
                        right: Base.compileValue(this.to, context) },
                     update:
                      { type: 'AssignmentExpression',
                        operator: '+=',
                        left: { type: 'Identifier', name: 'i' },
                        right: { type: 'Literal', value: 1 } }, // TODO
                     body:
                      { type: 'BlockStatement',
                        body:
                         [ { type: 'ExpressionStatement',
                             expression:
                              { type: 'CallExpression',
                                callee:
                                 { type: 'MemberExpression',
                                   computed: false,
                                   object: { type: 'Identifier', name: '$$res' },
                                   property: { type: 'Identifier', name: 'push' } },
                                arguments:
                                 [ { type: 'CallExpression',
                                     callee: { type: 'Identifier', name: '$$fn' },
                                     arguments: [ { type: 'Identifier', name: 'i' } ] } ] } } ] } },
                   { type: 'ReturnStatement',
                     argument: { type: 'Identifier', name: '$$res' } } ] } },
          arguments: [] };
};

module.exports = Comprehension;
