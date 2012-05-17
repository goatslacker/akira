var JSReserved = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with'];

var Base = {
  run: function (context) {
    return this;
  },
  compile: function (context) {
    return this;
  }
};

var getContext = function (val, context) {
  for (var i = context.length - 1; i >= 0; i -= 1) {
    if (context[i].hasOwnProperty(val)) {
      return i;
    }
  }

  return context.length - 1;
};

Base.getValue = function (val, context) {
  var result;

  if (typeof val === "string") {
    var i = getContext(val, context);
    result = context[i][val];
  } else {
    result = val.run(context);
  }

  return result;
};


Base.compileValue = function (val, context) {
  var result;

  if (val == null) {
    return '';
  } else if (typeof val === "string") {
    if (JSReserved.indexOf(val) !== -1) {
      val = '$' + val;
    }

    result = { type: 'Identifier', name: val };
  } else {
    result = val.compile(context);
  }

  return result;
};

Base.compile = Base.compileValue;

function a(fn) {
  return function (context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return fn.apply(fn, args.map(function (arg) {
      return Base.compile(arg, context);
    }));
  };
}

Base.assignment = a(function (name, value) {
  return {
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: [{
      type: 'VariableDeclarator',
      id: name,
      init: value
    }]
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


Base.setValue = function (name, val, context) {
  var i = getContext(name, context);
  context[i][name] = val;
  return val;
};

Base.extend = function (props) {
  var defs = {}, key;
  for (key in props) {
    if (props.hasOwnProperty(key)) {
      defs[key] = {value: props[key], enumerable: true};
    }
  }
  return Object.create(this, defs);
};

module.exports = Base;
