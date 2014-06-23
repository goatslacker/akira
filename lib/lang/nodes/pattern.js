var BinaryExpression = require('ast/BinaryExpression');
var Identifier = require('ast/Identifier');
var Literal = require('ast/Literal');
var MemberExpression = require('ast/MemberExpression');
var ast = require('ast');
var createFunction = require('createFunction');
var destructure = require('destructure');
var getScope = require('getScope')
var implicitReturn = require('implicitReturn');
var inline = require('inline');

function addFnLength(args, arg) {
  var rest;
  var els;

  args.forEach(function (node) {
    node = Object(node);
    rest = rest || node.__rest;
    els = els || node.name === 'else';
  });

  if (els) {
    return null;
  }
  if (rest) {
    return Literal(true);
  }

  return BinaryExpression(
    '===',
    MemberExpression(
      arg,
      Identifier('length')
    ),
    Literal(args.length)
  );
}

function getCols(matrix) {
  var a = [];
  matrix.forEach(function (x) {
    x.forEach(function (n, i) {
      a[i] = a[i] || [];
      if (Object(n).name !== 'else') {
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
  };
}

function match(arg, node, idx, expr, scope) {
  switch (node.type) {
  case undefined:
    return BinaryExpression(
      '==',
      arg,
      Literal(null)
    );
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
        return match(
          MemberExpression(arg, node.key),
          node,
          idx,
          expr,
          scope
        );
      })
      .filter(function (x) { return !!x })
      .reduce(logicalAnd);
  case 'ArrayExpression':
    if (node.elements.length === 0) {
      return BinaryExpression(
        '===',
        MemberExpression(
          arg,
          Identifier('length')
        ),
        Literal(0)
      );
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
        return match(
          MemberExpression(arg, Literal(idn), true),
          node,
          idx,
          expr,
          scope
        );
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
    return BinaryExpression('===', arg, node);
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
    var args = ast(pattern[0], context);
    return Array.isArray(args) ? args : [args];
  });

  var params = getCols(patterns)
    .map(function (p, i) {
      var ret = p.filter(function (node) {
        node = Object(node);
        return node.type === 'Identifier' && node.name !== '_';
      });

      if (ret.length === 0) {
        return Identifier('_$p' + i);
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
  var scope = getScope(context, params)

  body.push({
    type: 'SwitchStatement',
    discriminant: Literal(false),
    cases: this.patterns.map(function (pattern, i) {
      var args = patterns[i];

      var test = args
        .map(function (node, idx) {
          node = Object(node);
          if (node.type === 'FunctionExpression') {
            return inline(pattern[0].args[idx], params[idx], context);
          }
          return match(params[idx], node, idx, expr, scope);
        })
        .filter(function (x) { return !!x })
        .concat(addFnLength(args, Identifier('arguments')))
        .reduce(logicalAnd);

      var consequent = ast(pattern[1], scope);
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
      };
    })
  });

  return createFunction(
    ast(params, scope),
    expr.concat(body),
    scope
  );
};

module.exports = Pattern;
