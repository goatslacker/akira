var Base = require('./base');

var Nodes = function (nodes) {
  this.nodes = [];
  nodes && this.nodes.push(nodes);
  return this;
};

Nodes.prototype = {
  getUtils: function () {
    return Base._utils.map(function (n) {
      return n.ast;
    });
  },
  addVars: function (context) {
    var scope = {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: Object.keys(context).map(function (variable) {
        return Base.assignment(context, variable, null);
      })
    };

    if (scope.declarations.length > 0) {
      return [scope];
    }

    return [];
  },
  compile: function (context) {
    var nodes = this.nodes.map(function (node) {
      var n = Base.compileValue(node, context);
      n = Array.isArray(n) ? n.pop() : n;
      if (!n) {
        return { type: 'EmptyStatement' };
      }
      if (n.type === 'TryStatement') {
        return n;
      }
      if (n.type === 'VariableDeclaration') {
        return n;
      }
      if (n.type === 'IfStatement') {
        return n;
      }
      if (n.type === 'ExpressionStatement') {
        return n;
      }
      return { type: 'ExpressionStatement', expression: n };
    });

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
