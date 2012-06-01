var Base = require('./base');

var Nodes = function (nodes) {
  this.nodes = [];
  nodes && this.nodes.push(nodes);
  return this;
};

Nodes.prototype = {
  getUtils: function (context) {
    return Base._utils.map(function (n) {
      if (!context[n.name]) {
        return n.ast;
      }
    }).filter(function (n) { return !!n });
  },
  addVars: function (context) {
    return Base.addScope(context, []);
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
