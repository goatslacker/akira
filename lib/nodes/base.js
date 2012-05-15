var JSReserved = ['break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with'];

var Base = {
  dump: function () {
    var obj = {};
    var Functions = ['run', 'dump', 'compile'];

    Object.keys(this).forEach(function (prop) {
      if (Functions.indexOf(prop) < 0) {
        if (Array.isArray(this[prop])) {
          obj[prop] = [];
          this[prop].forEach(function (arg, index) {
            obj[prop].push((arg && typeof arg === "object") ? arg.dump() : arg);
          });
        } else {
          obj[prop] = (this[prop] && typeof this[prop] === "object") ? this[prop].dump() : this[prop];
        }
      }
    }.bind(this));

    return obj;
  },
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

Base.cv = function (id) {
  if (JSReserved.indexOf(id) !== -1) {
    return '$' + id;
  }

  return id;
};

Base.compileValue = function (val, context) {
  var result;

  val = Base.cv(val);

  if (val == null) {
    return '';
  } else if (typeof val === "string") {
    result = { type: 'Identifier', name: val };
//    var i = getContext(val, context);
//    result = context[i][val];
  } else {
    result = val.compile(context);
  }

  return result;
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
