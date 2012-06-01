var Base = require('./base');
var esprima = require('esprima');

var JSReserved = ['break', 'case', 'continue', 'debugger', 'default', 'delete', 'do', 'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'typeof', 'var', 'void', 'while', 'with'];

var F = {
  head: function head(list) {
    return list[0];
  },
  init: function init(list) {
    return list.slice(0, list.length - 1);
  },
  tail: function tail(list) {
    return list.slice(1, list.length);
  },
  last: function last(list) {
    return list[list.length - 1];
  },
  eq: function eq(a, b) {
    return a === b;
  },
  neq: function neq(a, b) {
    return a !== b;
  },
  assert: function assert(eq) {
    if (!eq) {
      throw new Error(eq);
    }
  },
  arrEq: function arrEq(arr, arr_eq) {
    return arr.filter(function (x, i) {
      return x === arr_eq[i];
    }).length === arr.length;
  },
  consts: function consts(a) {
    return a;
  },
  flip: function flip(f, a, b) {
    return f(b, a);
  },
  square: function square(x) {
    return x * x;
  },
  sum: function sum() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
      return a + b;
    });
  },
  sub: function sub() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
      return a - b;
    });
  },
  prod: function prod() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
      return a * b;
    });
  },
  div: function div() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
      return a / b;
    });
  },
  at: function at(list, index) {
    return list[index - 1];
  },
  get: function get(obj, prop) {
    return obj[prop];
  },
  call: function call(obj, prop) {
    var args = Array.prototype.slice.call(arguments, 2);
    return obj[prop].apply(obj, args);
  },
  length: function length(list) {
    return list.length;
  },
  partial: function partial(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      var args_ = Array.prototype.slice.call(arguments, 0);
      return f.apply(f, args.concat(args_));
    };
  },
  pop: function pop(list) {
    return list.pop();
  },
  print: function print() {
    var args;
    if (typeof console !== 'undefined') {
      args = Array.prototype.slice.call(arguments, 0);
      console.log.apply(console, args);
    }
    return args;
  },
  mod: function mod(a, b) {
    return a % b;
  },
  filter: function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
      return fn(node, index + 1, list);
    });
  },
  map: function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
      return fn(node, index + 1, list);
    });
  },
  foldl: function foldl(fn, list) {
    return Array.prototype.reduce.call(list, fn);
  },
  foldr: function foldr(fn, list) {
    return Array.prototype.reduceRight.call(list, fn);
  },
  range: function range(fn, a, b) {
    var list = [];
    for (var i = a; i <= b; i += 1) {
      list.push(fn ? fn(i) : i);
    }
    return list;
  },
  raise: function raise(msg, error) {
    error = error || Error;
    throw error(msg);
  }
};

var Utils = function (name) {
  if (JSReserved.indexOf(name) !== -1) {
    name = '$' + name;
  }
  this.name = name.replace(/-([a-z])/g, function (i) { return i[1].toUpperCase() });
  return this;
};

Utils.prototype.compile = function (context) {
  if (F.hasOwnProperty(this.name)) {
    var ast = esprima.parse(F[this.name].toString());
    Base.extras(this.name, ast.body[0]);
  }

  return { type: 'Identifier', name: this.name };
};

module.exports = Utils;
