var Base = {};
var lz = require('lz');

function js(item) {
  return require('../js-ast/' + item);
}

Base.AssignmentExpression = js('AssignmentExpression');
Base.CallExpression = js('CallExpression');
Base.FunctionExpression = js('FunctionExpression');

Base.concatMap = function (fn, arr) {
  var index = -1;
  var length = arr.length;
  var results = [];

  while (++index < length) {
    results = results.concat(fn(arr[index], index, arr));
  }

  return results;
}

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

function implicitReturn(body) {
  var ret = body[body.length - 1];
  ret = ret.type === 'ExpressionStatement' ? ret.expression : ret;

  switch (ret.type) {
    case 'ThrowStatement':
    case 'ForInStatement':
      return;
  }

  if (ret.type === 'TryStatement') {
    implicitReturn(ret.block.body);
    return;
  } else if (ret.type === 'SwitchStatement') {
    if (ret.__cond === true) {
      ret.cases.forEach(function (x) {
        implicitReturn(x.consequent);
      });
    } else {
      return;
    }
  } else if (ret.type === 'IfStatement') {
    implicitReturn(ret.consequent.body);
    ret.alternate && implicitReturn(ret.alternate.body);
  } else {
    body[body.length - 1] = {
      type: 'ReturnStatement',
      argument: ret
    };
  }
}

Base.implicitReturn = implicitReturn;

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

Base.functioncall = a(function (callee, args) {
  if (!args) {
    args = [];
  }
  if (!Array.isArray(args)) {
    args = [args];
  }

  return {
    type: 'CallExpression',
    callee: callee,
    arguments: args
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
  var last = Base.traverse(body[body.length - 1], function (node) {
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
        expressions.push.apply(expressions, Base.destructure({
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

Base.traverse = function (object, fn, parent, type, scope) {
  var o = {};
  scope = scope || {};

  Object.keys(object).forEach(function (key) {
    var child = object[key];

    var type = Object.prototype.toString.call(child);

    if (parent) {
      switch (parent.type) {
        case 'AssignmentExpression':
          if (parent.left.type === 'Identifier') {
            scope[parent.left.name] = parent.left;
          }
          break;
        case 'FunctionExpression':
          scope = Object.create(scope);
          parent.params.forEach(function (param) {
            scope[param.name] = param;
          });
          break;
      }
    }

    switch (type) {
      case '[object Object]':
        o[key] = Base.traverse(child, fn, object, key, scope);
        break;
      case '[object Array]':
        o[key] = Base.concatMap(function (el) {
          return Base.traverse(el, fn, el, key, scope);
        }, child);
        break;
      default:
        o[key] = child;
    }
  });

  return fn(o, parent, type, scope);
};

Base.destructure = function (arg, dataStructure, idx, fn, context) {
  var tmpvar = '_$ds' + idx;

  var is_obj = false;
  var elements;
  var rest = false;

  switch (dataStructure.type) {
    case 'ArrayExpression':
      elements = dataStructure.elements;
      break;
    case 'ObjectExpression':
      elements = dataStructure.properties;
      is_obj = true;
      break;
  }

  return Base.concatMap(function (node, index, ls) {
    if (context[node.name]) {
      return fn(node.name);
    }

// FIXME clean this up
    if (node.type !== 'Identifier' &&
      node.type !== 'ArrayExpression' &&
      node.type !== 'ObjectExpression' &&
      node.type !== 'Property') {
      return null;
    }

    if (node.type === 'ArrayExpression') {
      return Base.destructure({
        type: 'MemberExpression',
        computed: true,
        object: arg,
        property: { type: 'Literal', value: index }
      }, node, idx + 1, fn, context);
    }
    if (node.type === 'ObjectExpression') {
      return Base.destructure({
        type: 'MemberExpression',
        computed: true,
        object: arg,
        property: { type: 'Literal', value: index }
      }, node, idx + 1, fn, context);
    }
    if (node.type === 'Property' && node.value.type === 'ObjectExpression') {
      return Base.destructure({
        type: 'MemberExpression',
        computed: false,
        object: arg,
        property: node.key
      }, node.value, idx + 1, fn, context);
    }

    if (node.name === '_') {
      node.name = tmpvar + index;
    }

    if (node.__rest) {
      rest = true;
      action = {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          computed: false,
          object: arg,
          property: { type: 'Identifier', name: 'slice' }
        },
        arguments: [{
          type: 'Literal',
          value: index
        }, {
          type: 'BinaryExpression',
          operator: '-',
          left: {
            type: 'MemberExpression',
            computed: false,
            object: arg,
            property: { type: 'Identifier', name: 'length' }
          },
          right: {
            type: 'Literal',
            value: (ls.length - index - 1)
          }
        }]
      };
    // FIXME this is ugly
    // we should move this whole destructuring business out to it's own
    // file
    } else if (node.type === 'Property') {
      action = {
        type: 'MemberExpression',
        computed: false,
        object: arg,
        property: node.value.type === 'Identifier' ? node.value : node.key
      };
      node = node.key;
    } else {

      if (rest) {
        action = {
          type: 'MemberExpression',
          computed: true,
          object: arg,
          property: {
            type: 'BinaryExpression',
            operator: '-',
            left: {
              type: 'MemberExpression',
              computed: false,
              object: arg,
              property: { type: 'Identifier', name: 'length' }
            },
            right: {
              type: 'Literal',
              value: (ls.length - index)
            }
          }
        };
      } else {
        action = {
          type: 'MemberExpression',
          computed: true,
          object: arg,
          property: { type: 'Literal', value: index }
        };
      }
    }

    return context[node.name] = {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: node,
        right: action
      }
    };
  }, elements).filter(function (x) {
    return x !== null;
  });
}

Base._core = {};
Base._macros = {};

module.exports = Base;
