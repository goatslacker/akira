require('log')

var ArrayExpression = require('ast/ArrayExpression')
var AssignmentExpression = require('ast/AssignmentExpression');
var CallExpression = require('ast/CallExpression');
var ExpressionStatement = require('ast/ExpressionStatement');
var FunctionExpression = require('ast/FunctionExpression');
var Identifier = require('ast/Identifier');
var MemberExpression = require('ast/MemberExpression')
var Store = require('Store');
var VariableDeclaration = require('ast/VariableDeclaration');
var Literal = require('ast/Literal')
var addScope = require('addScope');
var ast = require('ast');
var betaRedex = require('betaRedex');
var concatMap = require('concatMap');
var core = require('../../core/core');
var esprima = require('esprima');
var fu = require('fu')
var traverse = require('traverse');

function Nodes(nodes) {
  this.nodes = [];
  nodes && this.nodes.push(nodes);
  return this;
}

function include(name) {
  if (Store.core[name]) {
    return null;
  }

  Store.core[name] = VariableDeclaration([
    [
      Identifier(name),
      core[name] //[0].expression.right
    ]
  ]);

  // autoload dependencies
  Nodes.prototype.flagCoreMethods(core[name]);
}

function shouldInclude(parentType, nodeKey, node) {
  switch (parentType) {
  case 'ReturnStatement':
  case 'CallExpression':
  case 'NewExpression':
    return true;
  default:
    if (parentType === 'AssignmentExpression' && nodeKey === 'right') {
      return true;
    }
    if (parentType === 'Property' && nodeKey === 'value') {
      return true;
    }
    if (parentType === 'Identifier' && nodeKey === 'arguments') {
      return true;
    }
    if (parentType === 'MemberExpression' && nodeKey === 'object') {
      return true
    }
  }
}

Nodes.prototype = {
  addVars: function (context, evald) {
    var scope = {};
    Object.keys(context).forEach(function (k) {
      if (k.substr(0, 3) !== '$$$') {
        scope[k] = context[k];
      }
    });
    return addScope(scope, [], evald);
  },
  addDeps: function (context) {
    var deps = Object.keys(Store.deps).map(function (name) {
      context[name] = ExpressionStatement(
        AssignmentExpression(
          Identifier(name),
          CallExpression(
            FunctionExpression(
              null,
              [],
              Store.deps[name]
            ),
            []
          )
        )
      )

      return context[name];
    });

    Store.deps = {};

    return deps;
  },
  addCore: function () {
    var core = Store.core;
    var result = Object.keys(core).map(function (key) {
      return core[key];
    });
    Store.core = {};
    return result;
  },
  flagCoreMethods: function (tree, context) {
    traverse(tree, function (node, parent, type, scope) {
      if (!parent || !node.__core) {
        return;
      }

      if (shouldInclude(parent.type, type) && !scope[node.name]) {
        include(node.name);
      }
    });
  },
  addContracts: function (tree) {
    var util = require('util')

    function hasTypeCheck(node) {
      return node.type === 'AssignmentExpression' &&
        node.left.type === 'Identifier' &&
        Store.types.hasOwnProperty(node.left.name) &&
        node.right.type === 'FunctionExpression'
    }

    function typeCheckArgs(argTypes, args) {
      return [{
        type: "ExpressionStatement",
        expression: CallExpression(
          Identifier('_$tg'),
          [ArrayExpression(argTypes), ArrayExpression(args)]
        )
      }]
    }

    function typeCheckReturn(returnType, returnArg) {
      return {
        type: 'ReturnStatement',
        argument: CallExpression(
          Identifier('_$tg'),
          (Array.isArray(returnType) ? returnType : [returnType]).concat(
            returnArg
          )
        )
      }
    }

    function maybeAddAsync(asyncValue, body) {
      if (!asyncValue) {
        return body
      }

      var xret = {
        type: 'ReturnStatement',
        argument: CallExpression(
          Identifier('_$tg'),
          [asyncValue, MemberExpression(Identifier('arguments'), Literal(0), true)]
        )
      }

      return CallExpression(
        MemberExpression(body, Identifier('then')),
        [FunctionExpression(null, [], [xret])]
      )
    }

    var includeTG = [{
      "type": "VariableDeclaration",
      "declarations": [{
        "type": "VariableDeclarator",
        "id": {
          "type": "Identifier",
          "name": "_$tg"
        },
        "init": MemberExpression(
          CallExpression(Identifier('require'), [Literal('tg')]),
          Identifier('tg')
        )
      }],
      "kind": "var"
    }]

    var shouldIncludeTG = false

    var nodes = traverse(tree, function (node, parent) {
      if (node.type === 'Identifier' && node.name === '_$tg') {
        shouldIncludeTG = true
      }

      if (hasTypeCheck(node)) {
        var name = node.left.name
        var fn = node.right

        var fnBody = betaRedex(fn.body.body)
        var typedArgs = Store.types[name].params.length
          ? typeCheckArgs(Store.types[name].params, fn.params)
          : []

        return AssignmentExpression(
          node.left,
          FunctionExpression(
            null,
            fn.params,
            typedArgs.concat(typeCheckReturn(
              Store.types[name].retval,
              maybeAddAsync(Store.types[name].retvalAsync, fnBody)
            ))
          )
        )
      }

      return node
    })

    // clear our types store so that types don't bleed out into other files
    Store.types = {}

    return shouldIncludeTG ? includeTG.concat(nodes) : nodes
  },

  compile: function (context, filename) {
    // setting this to resolve cyclic dependencies if they arise
    if (filename) {
      context.$$$filename = filename;
    }

    var nodes = concatMap(function (node) {
      var n = ast(node, context);
      if (!Array.isArray(n)) {
        n = [n];
      }
      return n.map(function (n) {
        if (!n) {
          return { type: 'EmptyStatement' };
        }

        return ExpressionStatement(n)
      });
    }, this.nodes);

    return nodes;
  },

  push: function (node) {
    this.nodes.push(node);
    return this;
  }
};

Nodes.wrap = function (node) {
  if (node.length === 1 && node instanceof Nodes) {
    return node[0];
  } else {
    return new Nodes(node);
  }
};

module.exports = Nodes;
