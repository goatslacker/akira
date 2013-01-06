var AssignmentExpression = require('ast/AssignmentExpression');
var CallExpression = require('ast/CallExpression');
var FunctionExpression = require('ast/FunctionExpression');
var Identifier = require('ast/Identifier');
var Store = require('Store');
var VariableDeclaration = require('ast/VariableDeclaration');
var addScope = require('addScope');
var ast = require('ast');
var concatMap = require('concatMap');
var core = require('../../core/core');
var esprima = require('esprima');
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
      core[name][0].expression.right
    ]
  ]);

  // autoload dependencies
  Nodes.prototype.flagCoreMethods(core[name]);
}

function shouldInclude(parentType, nodeKey) {
  switch (parentType) {
  case 'ReturnStatement':
  case 'CallExpression':
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
      context[name] = {
        type: 'ExpressionStatement',
        expression: AssignmentExpression(
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
      };

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

        switch (n.type) {
        case 'TryStatement':
        case 'VariableDeclaration':
        case 'IfStatement':
        case 'SwitchStatement':
        case 'ExpressionStatement':
        case 'ForInStatement':
        case 'ReturnStatement':
        case 'BlockStatement':
        case 'ThrowStatement':
          return n;
        default:
          return { type: 'ExpressionStatement', expression: n };
        }
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
