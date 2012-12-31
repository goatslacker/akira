var Base = {};
var escodegen = require('escodegen');
var concatMap = require('concatMap');
var TypeSystem = require('TypeSystem');
var implicitReturn = require('implicitReturn');
var destructure = require('destructure');
var traverse = require('traverse');


Base.CallExpression = require('ast/CallExpression');


Base.compileValue = function (val, context) {
  var result;

  if (val == null) {
    return '';
  } else if (typeof val === "string") {
    result = { type: 'Identifier', name: val };
  } else if (val.compile) {
    result = val.compile(context);
  } else {
    result = val;
  }

  return result;
};

Base.inline = function (params, id, context) {
  var keys = [
    'operators',
    'compare'
  ];

  if (params.params && params.params.args[0] === 'it') {
    var property = keys.filter(function (k) {
      return !!params.body[k];
    }).pop();

    if (property) {
      params.body[property][0] = id;
    } else if (params.body.id === 'it') {
      params.body.id = id;
    } else if (params.body.ref.id === 'it') {
      params.body.ref.id = id;
    }

    return Base.compileValue(params.body, context);
  }

  // TODO what to do here?
  return null;

  return Base.compileValue(params, context);

  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: Base.compileValue(params, context),
      property: { type: 'Identifier', name: 'apply' }
    },
    arguments: [
      { type: 'Identifier', name: 'this' },
      { type: 'Identifier', name: 'arguments' }
    ]
  };
}

function a(fn) {
  return function (context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return fn.apply(fn, args.map(function (arg) {
      return Base.compileValue(arg, context);
    }).concat([context]));
  };
}

Base.addScope = function (context, body, evald) {
  var fn = Object.keys(context).map(function (variable) {
    if (variable.substr(0, 3) === '$$$') {
      return null;
    }
    return Base.assignment(context, variable, null);
  });

  var scope = {
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: fn.filter(function (x) { return !!x; })
  };

  if (scope.declarations.length > 0) {
    body = [scope].concat(body);
  }

  return body;
};

Base.assignment = a(function (name, value) {
  return {
    type: 'VariableDeclarator',
    id: name,
    init: value
  };
});


Base.binary = function (context, operator, left, right) {
  return {
    type: 'BinaryExpression',
    operator: operator,
    left: Base.compileValue(left, context),
    right: Base.compileValue(right, context)
  };
};

Base.functiondef = a(function (lambda, params, body, context) {
  if (!Array.isArray(body)) {
    body = [body];
  }
  lambda = lambda.name;

  implicitReturn(body);

  var recur = false;
  var last = traverse(body[body.length - 1], function (node) {
    if (!node.__recur) {
      return node;
    }

    if (!params) {
      throw TypeError('Tried to use recur somewhere without any parameters');
    }

    recur = true;

    return node.body.concat(node.body.map(function (arg, idx) {
      var param = params[idx++];

      if (Array.isArray(param)) {
        param = param[0].expression.left;
      }

      return {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: param,
          right: arg.declarations[0].id
        }
      }
    }), { type: 'ContinueStatement', label: null });
  });

  if (recur) {
    body[body.length - 1] = last;
    body = [{
      type: 'WhileStatement',
      test: { type: 'Literal', value: true },
      body: {
        type: 'BlockStatement',
        body: body
      }
    }];
  }

  var expressions = [];
  var tmpvar = '_$fp';

  if (params) {
    params = params.map(function (param, pi, ls) {
      var a;

      if (param.name === '_') {
        param.name = tmpvar + pi;
      }
      // TODO move this
      // TODO better check for this...
      if (Array.isArray(param)) {
        a = param[0].expression.left;

        // FIXME don't mutate
        delete context[a.name];
        expressions.push({
          type: 'IfStatement',
          test: Base.binary(context, '==', a, 'null'),
          consequent: param[0],
          alternate: null
        });
        return a;
      } else if (param.type === 'ArrayExpression') {
        expressions.push.apply(expressions, destructure({
          type: 'Identifier',
          name: '_$fv'
        }, param, 0, function () { }, context));

        return {
          type: 'Identifier',
          name: '_$fv'
        };
      } else if (param.__rest) {
        expressions.push({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: param,
            right: {
              type: "CallExpression",
              callee: {
                type: "MemberExpression",
                computed: false,
                object: {
                  type: "MemberExpression",
                  computed: false,
                  object: {
                    type: "MemberExpression",
                    computed: false,
                    object: {
                      type: "Identifier",
                      name: "Array"
                    },
                    property: {
                      type: "Identifier",
                      name: "prototype"
                    }
                  },
                  property: {
                    type: "Identifier",
                    name: "slice"
                  }
                },
                property: {
                  type: "Identifier",
                  name: "call"
                }
              },
              arguments: [{
                type: "Identifier",
                name: "arguments"
              }, {
                type: 'Literal',
                value: pi
              }, {
                type: 'BinaryExpression',
                operator: '-',
                left: {
                  type: 'MemberExpression',
                  computed: false,
                  object: { type: 'Identifier', name: 'arguments' },
                  property: { type: 'Identifier', name: 'length' }
                },
                right: {
                  type: 'Literal',
                  value: (ls.length - pi - 1)
                }
              }]
            }
          }
        });
      }

      return param;
    });

    body = expressions.concat(body);
  }

  body = Base.addScope(context, body);

  return {
    type: 'FunctionExpression',
    id: null,
    params: params || [],
    body: {
      type: 'BlockStatement',
      body: body
    }
  };
});

Base._deps = {};

Base._core = {};
Base._macros = {};

module.exports = Base;
