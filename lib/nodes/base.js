var Base = {};

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

function implicitReturn(body) {
  var ret = body[body.length - 1];
  ret = ret.type === 'ExpressionStatement' ? ret.expression : ret;
  if (ret.type === 'SwitchStatement') {
    return;
  } else if (ret.type === 'IfStatement') {
    implicitReturn(ret.consequent.body);
    implicitReturn(ret.alternate.body);
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
  var fn;
  if (evald) {
    fn = Object.keys(context).map(function (variable) {
      return Base.assignment(context, variable, context[variable]);
    });
  } else {
    fn = Object.keys(context).map(function (variable) {
      return Base.assignment(context, variable, null);
    });
  }

  var scope = {
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: fn
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

Base.functiondef = a(function (name, params, body, context) {
  if (!Array.isArray(body)) {
    body = [body];
  }

  var expressions = [];

  if (params) {
    params = params.map(function (param, pi) {
      var a;
      var listvar = '$$list' + pi;
      var offsetvar = '$$offset' + pi;
      if (Array.isArray(param)) {
        a = param[0].expression.left;
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
            var action = listvar + '[' + offsetvar + ']';

            if (val.__rest) {
              action = listvar + '.slice(' + index + ', (' + offsetvar + ' = (' + listvar + '.length - ' + (ls.length - index - 1) + ')))';
            }

            return Base.assignment(context, val, action);
          }))
        });
        return { type: 'Identifier', name: listvar };
      } else if (param.__rest) {
        expressions.push(Base.assignment(context, param, 'Array.prototype.slice.call(arguments, ' + pi + ')'));
      }

      return param;
    });

    body = expressions.concat(body);
  }

  implicitReturn(body);

  body = Base.addScope(context, body);

  var fn = {
    type: 'FunctionExpression',
    id: name,
    params: params || [],
    body: {
      type: 'BlockStatement',
      body: body
    }
  };

  if (name) {
    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: name,
        right: fn
      }
    }
  }

  return fn;
});


Base.extras = function (name, ast) {
  if (!Base.utilExists(name)) {
    Base._utils.push({ name: name, ast: ast });
  }
};

Base.utilExists = function (name) {
  return Base._utils.filter(function (n) {
    return n.name === name;
  }).length > 0;
};

Base._utils = [];

module.exports = Base;
