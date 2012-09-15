var Base = require('./base');

var Nodes = function (nodes) {
  this.nodes = [];
  nodes && this.nodes.push(nodes);
  return this;
};

Nodes.prototype = {
  getUtils: function (context) {
    context.$$$exports = context.$$$exports || {};
    var f = Base._utils.map(function (n) {
      if (!context[n.name] && !context.$$$exports[n.name]) {
        return n.ast;
      }
    }).filter(function (n) { return !!n });
    Base._utils = [];
    return f;
  },
  addVars: function (context, evald) {
    var scope = {};
    Object.keys(context).forEach(function (k) {
      if (k.substr(0, 3) !== '$$$') {
        scope[k] = context[k];
      }
    });
    return Base.addScope(scope, [], evald);
  },
  compile: function (context, filename) {
    // setting this to resolve cyclic dependencies if they arise
    if (filename) {
      Base._dependencies[filename] = true;
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
