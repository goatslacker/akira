var Base = require('./base');
var util = require('util');
var implicitReturn = require('implicitReturn');
var destructure = require('destructure');

function addFnLength(args, arg) {
  var rest;
  var els;

  args.forEach(function (node) {
    rest = rest || node.__rest;
    els = els || node.name === 'else';
  });

  if (els) return null;
  if (rest) return { type: 'Literal', value: true }

  return {
    type: 'BinaryExpression',
    operator: '===',
    left: {
      type: 'MemberExpression',
      computed: false,
      object: arg,
      property: { type: 'Identifier', name: 'length' }
    },
    right: { type: 'Literal', value: args.length }
  }
}

function getCols(matrix) {
  var a = [];
  matrix.forEach(function (x) {
    x.forEach(function (n, i) {
      a[i] = a[i] || [];
      if (n.name !== 'else') {
        a[i].push(n);
      }
    });
  });
  return a;
}

function logicalAnd(a, b) {
  return {
    type: 'LogicalExpression',
    operator: '&&',
    left: a,
    right: b
  }
}

function match(arg, node, idx, expr, scope) {
  switch (node.type) {
    case undefined:
      return {
        type: 'BinaryExpression',
        operator: '==',
        left: arg,
        right: {
          type: 'Literal',
          value: null
        }
      }
    case 'Property':
      return arg;
    case 'ObjectExpression':
      // TODO make sure destructuring matches correct argument placing index
      expr.push.apply(
        expr,
        destructure(arg, node, idx, function (name) {
          return false;
        }, scope)
      );

      return node.properties
        .map(function (node) {
          return match({
            type: 'MemberExpression',
            computed: false,
            object: arg,
            property: node.key
          }, node, idx, expr, scope);
        })
        .filter(function (x) { return !!x })
        .reduce(logicalAnd);

      return { type: 'Literal', value: true };
    case 'ArrayExpression':
      if (node.elements.length === 0) {
        return {
          type: 'BinaryExpression',
          operator: '===',
          left: {
            type: 'MemberExpression',
            computed: false,
            object: arg,
            property: { type: 'Identifier', name: 'length' }
          },
          right: {
            type: 'Literal',
            value: 0
          }
        };
      }

      // TODO make sure destructuring matches correct argument placing index
      expr.push.apply(
        expr,
        destructure(arg, node, idx, function (name) {
          return null;
        }, scope)
      );

      return node.elements
        .map(function (node, idn) {
          return match({
            type: 'MemberExpression',
            computed: true,
            object: arg,
            property: { type: 'Literal', value: idn }
          }, node, idx, expr, scope);
        })
        .filter(function (x) { return !!x })
        .concat(addFnLength(node.elements, arg))
        .reduce(logicalAnd);
    case 'Identifier':
      if (node.name === 'else') {
        return null;
      }
      return false;
    case 'CallExpression':
      return node;
    default:
      return {
        type: 'BinaryExpression',
        operator: '===',
        left: arg,
        right: node
      }
  }
}

function Pattern(patterns) {
  this.patterns = patterns.args.slice(0);
  return this;
}

Pattern.prototype.compile = function (context) {
  var self = this;
  // TODO
  // add Object destructuring
  // more flexibility with callexpressions in patterns? like there should be a way to apply a function to each given argument:
  //
  //   -- here both neg? and pos? are functions. I want to apply them to &0, perhaps even bound to a symbol right here?
  //   num = fn
  //     [0] 0
  //     [=> neg?] -1
  //     [pos? => x] x
  // XXX
  var patterns = this.patterns.map(function (pattern) {
    var args = Base.compileValue(pattern[0], context);
    return Array.isArray(args) ? args : [args];
  });

  var params = getCols(patterns)
    .map(function (p, i) {
      var ret = p.filter(function (node) {
        return node.type === 'Identifier' && node.name !== '_';
      });

      if (ret.length === 0) {
        return { type: 'Identifier', name: '_$p' + i };
      }

      return ret.reduce(function (a, b) {
        if (a.name !== b.name) {
          // TODO better msg
          throw new Error('All parameters must match correct order. ' +
            context.$$$filename + ':' + self.line);
        }
        return a;
      });
    });

  params.reduce(function (a, b) {
    if (a.name === b.name) {
      throw new Error('Duplicate parameter encountered');
    }
    return a;
  });

  var body = [];
  var expr = [];
  var scope = { $$$filename: context.$$$filename, $$$params: params };

  body.push({
    type: 'SwitchStatement',
    discriminant: { type: 'Literal', value: false },
    cases: this.patterns.map(function (pattern, i) {
      var args = patterns[i];

      var test = args
        .map(function (node, idx) {
          if (node.type === 'FunctionExpression') {
            return Base.inline(pattern[0].args[idx], params[idx], context);
          }
          return match(params[idx], node, idx, expr, scope);
        })
        .filter(function (x) { return !!x })
        .concat(addFnLength(args, {
          type: 'Identifier',
          name: 'arguments'
        }))
        .reduce(logicalAnd);

      var consequent = Base.compileValue(pattern[1], scope);
      consequent = Array.isArray(consequent) ? consequent : [consequent];
      implicitReturn(consequent);

      return {
        type: 'SwitchCase',
        test: test ? {
          type: 'UnaryExpression',
          operator: '!',
          argument: test
        } : test,
        consequent: consequent
      }
    })
  });

  return Base.functiondef(
    scope,
    null,
    params,
    expr.concat(body)
  );
};

module.exports = Pattern;
