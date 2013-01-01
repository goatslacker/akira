var CallExpression = require('ast/CallExpression');
var Store = require('Store');
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
  var deps = [];

  if (Store.core[name]) {
    return deps;
  }

  var vardec = {
    type: 'VariableDeclaration',
    declarations: [{
      type: 'VariableDeclarator',
      id: {
        type: 'Identifier',
        name: name
      },
      init: null
    }],
    kind: 'var'
  };

  // load in ast
  deps.push([vardec].concat(core[name]));

  // autoload dependencies
  Nodes.prototype.flagCoreMethods(core[name]);

  Store.core[name] = deps[deps.length - 1];

  return deps;
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
  addDeps: function () {
    var deps = Object.keys(Store.deps).map(function (name) {
      return {
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: [{
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: name },
          init: CallExpression({
            type: 'FunctionExpression',
            id: null,
            params: [],
            body: {
              type: 'BlockStatement',
              body: Store.deps[name]
            }
          }, [])
        }]
      };
    });

    Store.deps = {};

    return deps;
  },
  addCore: function () {
    var core = Store.core;
    var result = concatMap(function (key) {
      return core[key];
    }, Object.keys(core));
    Store.core = {};
    return result;
  },
  flagCoreMethods: function (tree) {
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
