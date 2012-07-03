var Base = require('./base');

function Comprehension(from, to, by, fn) {
  this.from = from;
  this.to = to;
  this.by = by;
  this.fn = fn;
  return this;
}

Comprehension.prototype.compile = function (context) {
  var result;
  var declarations = [{
    type: 'VariableDeclarator',
    id: { type: 'Identifier', name: '$$res' },
    init: { type: 'ArrayExpression', elements: [] }
  }];

  if (this.fn) {
    declarations.push({
      type: 'VariableDeclarator',
      id: { type: 'Identifier', name: '$$fn' },
      init: Base.compileValue(this.fn, context)
    });
    result = {
      type: 'CallExpression',
      callee: { type: 'Identifier', name: '$$fn' },
      arguments: [ { type: 'Identifier', name: 'i' } ]
    };
  } else {
    result = { type: 'Identifier', name: 'i' };
  }

return { type: 'CallExpression',
          callee:
           { type: 'FunctionExpression',
             id: null,
             params: [],
             body:
              { type: 'BlockStatement',
                body:
                 [ { type: 'VariableDeclaration',
                     declarations: declarations,
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
                        right: Base.compileValue(this.by, context) },
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
                                arguments: [result] } } ] } },
                   { type: 'ReturnStatement',
                     argument: { type: 'Identifier', name: '$$res' } } ] } },
          arguments: [] };
};

module.exports = Comprehension;
