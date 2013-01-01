var Base = {};
var implicitReturn = require('implicitReturn');
var destructure = require('destructure');
var traverse = require('traverse');
var addScope = require('addScope');
var ast = require('ast');
var BinaryExpression = require('ast/BinaryExpression');

function a(fn) {
  return function (context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return fn.apply(fn, args.map(function (arg) {
      return ast(arg, context);
    }).concat([context]));
  };
}

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
          test: BinaryExpression('==', ast(a, context), ast('null', {})),
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

  body = addScope(context, body);

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

module.exports = Base;
