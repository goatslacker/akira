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

function a(fn) {
  return function (context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return fn.apply(fn, args.map(function (arg) {
      return Base.compileValue(arg, context);
    }).concat([context]));
  };
}

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

  implicitReturn(body);

  var scope = {
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: Object.keys(context).map(function (variable) {
      return Base.assignment(context, variable, null);
    })
  };

  if (scope.declarations.length > 0) {
    body = [scope].concat(body);
  }

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
  var utils = Base._utils;
  var len = utils.filter(function (n) {
    return n.name === name;
  });
  if (len.length === 0) {
    utils.push({ name: name, ast: ast });
  }
};

Base._utils = [];

module.exports = Base;
