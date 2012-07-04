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
    Base._dependencies[filename] = true;

    var nodes = this.nodes.map(function (node) {
      var n = Base.compileValue(node, context);
      // TODO ability to return multiple stmts?
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
      if (n.type === 'ReturnStatement') {
        return n;
      }
      if (n.type === 'BlockStatement') {
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
