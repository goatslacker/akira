var Base = {};

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

  return null;
}

function implicitReturn(body) {
  var ret = body[body.length - 1];
  ret = ret.type === 'ExpressionStatement' ? ret.expression : ret;

  switch (ret.type) {
    case 'SwitchStatement':
    case 'ThrowStatement':
    case 'ForInStatement':
      return;
  }

  if (ret.type === 'IfStatement') {
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

  if (params) {
    params = params.map(function (param, pi) {
      var a;
      var vecvar = '$$vec' + pi;
      var offsetvar = '$$offset' + pi;
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
        var offset = 0;
        expressions.push({
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            Base.assignment(context, offsetvar, '0')
          ].concat(param.elements.map(function (val, index, ls) {
            var action = vecvar + '[' + offsetvar + '++]';

            if (val.__rest) {
              action = vecvar + '.slice(' + index + ', (' + offsetvar + ' = (' + vecvar + '.length - ' + (ls.length - index - 1) + ')))';
            }

            return Base.assignment(context, val, action);
          }))
        });
        return { type: 'Identifier', name: vecvar };
      } else if (param.__rest) {
        expressions.push(Base.assignment(context, param, 'Array.prototype.slice.call(arguments, ' + pi + ')'));
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

Base._core = {};
Base._macros = {};

module.exports = Base;
