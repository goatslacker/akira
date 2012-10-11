var Base = require('./base');
var utils = require('../../utils/');
var esprima = require('esprima');

function include(name, context) {
  var deps = [];

  if (context[name]) {
    return deps;
  }

  if (utils.dependencies[name]) {
    deps = Base.concatMap(function (el) {
      return include(el, context);
    }, utils.dependencies[name]);
  }

  deps.push(esprima.parse('var ' + name + ' = ' + utils.modules[name].toString()).body[0]);

  context[name] = deps[deps.length - 1];

  return deps;
}

function shouldInclude(parentType, nodeKey) {
  switch (parentType) {
    case 'ReturnStatement':
    case 'CallExpression':
    case 'AssignmentExpression':
      return true;
    default:
      if (parentType === 'Property' && nodeKey === 'value') {
        return true;
      }
      if (parentType === 'Identifier' && nodeKey === 'arguments') {
        return true;
      }
  }
}

var Nodes = function (nodes) {
  this.nodes = [];
  nodes && this.nodes.push(nodes);
  return this;
};

Nodes.prototype = {
  addVars: function (context, evald) {
    var scope = {};
    Object.keys(context).forEach(function (k) {
      if (k.substr(0, 3) !== '$$$') {
        scope[k] = context[k];
      }
    });
    return Base.addScope(scope, [], evald);
  },
  addDeps: function () {
    var deps = Object.keys(Base._deps).map(function (name) {
      return {
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: [{
          type: 'VariableDeclarator',
          id: { type: 'Identifier', name: name },
          init: {
            type: 'CallExpression',
            callee: {
              type: 'FunctionExpression',
              id: null,
              params: [{ type: 'Identifier', name: '$$export' }],
              body: {
                type: 'BlockStatement',
                body: Base._deps[name]
              }
            },
            arguments: []
          }
        }]
      };
    });

    Base._deps = {};

    return deps;
  },
  addCore: function () {
    var core = Base._core;
    var result = Base.concatMap(function (key) {
      return core[key];
    }, Object.keys(core));
    Base._core = {};
    return result;
  },
  flagCoreMethods: function (tree, context) {
    Base.traverse(tree, function (node, parent, type, scope) {
      if (!parent || !node.__utils) {
        return;
      }

      if (shouldInclude(parent.type, type) && !scope[node.name]) {
        include(node.name, Base._core);
      }
    });
  },
  compile: function (context, filename) {
    // setting this to resolve cyclic dependencies if they arise
    if (filename) {
      // TODO
//      Base._dependencies[filename] = true;
      context.$$$filename = filename;
    }

    var nodes = Base.concatMap(function (node) {
      var n = Base.compileValue(node, context);
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
          case 'ExpressionStatement':
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
