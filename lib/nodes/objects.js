var Base = require('./base');

function addProto(name, key, value) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'MemberExpression',
          computed: false,
          object: name,
          property: { type: 'Identifier', name: 'prototype' }
        },
        property: key
      },
      right: value
    }
  };
}

function Objects(name, clones, body) {
  this.name = name;
  this.clones = clones;
  this.body = body;
}

Objects.prototype.compile = function (context) {
  var name = Base.compileValue(this.name, context);
  var clone;

  var objbody = Base.compileValue(this.body, context);

  var construct = [{
    type: 'VariableDeclaration',
    declarations: [{
      type: 'VariableDeclarator',
      id: { type: 'Identifier', name: 'self' },
      init: { type: 'ThisExpression' }
    }],
    kind: 'var'
  }, {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: { type: 'Identifier', name: 'Object' },
            property: { type: 'Identifier', name: 'keys' }
          },
          arguments: [ { type: 'Identifier', name: '$$props' } ]
        },
        property: { type: 'Identifier', name: 'forEach' }
      },
      arguments: [{
        type: 'FunctionExpression',
        id: null,
        params: [ { type: 'Identifier', name: 'prop' } ],
        body: {
          type: 'BlockStatement',
          body: [{
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: { type: 'Identifier', name: 'self' },
                property: { type: 'Identifier', name: 'prop' }
              },
              right: {
                type: 'MemberExpression',
                computed: true,
                object: { type: 'Identifier', name: '$$props' },
                property: { type: 'Identifier', name: 'prop' }
              }
            }
          }]
        }
      }]
    }
  }];

  var body = [{
    type: 'FunctionDeclaration',
    id: name,
    params: [ { type: 'Identifier', name: '$$props' } ],
    body: {
      type: 'BlockStatement',
      body: construct
    }
  }];

  if (this.clones) {
    clone = Base.compileValue(this.clones, context);

    body = body.concat([{
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          computed: false,
          object: name,
          property: { type: 'Identifier', name: 'prototype' }
        },
        right: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            computed: false,
            object: { type: 'Identifier', name: 'Object' },
            property: { type: 'Identifier', name: 'create' }
          },
          arguments: [{
            type: 'MemberExpression',
            computed: false,
            object: clone,
            property: { type: 'Identifier', name: 'prototype' }
          }]
        }
      }
    }]);
  }

  body = body.concat(objbody.properties.map(function (prop) {
    return addProto(name, prop.key, prop.value);
  }));

  return { type: 'BlockStatement', body: body };
};

module.exports = Objects;
