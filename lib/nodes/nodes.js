var Base = require('./base');

var flatten = function (args) {
  var myargs = [];
  args.forEach(function (arg) {
//    if (arg.type === 'Program') {
//      myargs = myargs.concat(flatten(arg.body));
//    } else
    if (Array.isArray(arg)) {
      myargs = myargs.concat(flatten(arg));
    } else {
      myargs.push(arg);
    }
  });
  return myargs;
};

var Nodes = function (nodes) {
  this.nodes = [];
  nodes && this.nodes.push(nodes);
  return this;
};

Nodes.prototype = Base.extend({
  getUtils: function () {
    return Base._utils.map(function (n) {
      return n.ast;
    });
  },
  compile: function (context) {
    var nodes = this.nodes.map(function (node) {
      var n = Base.compileValue(node, context);
      n = Array.isArray(n) ? n.pop() : n;
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

    var scope = {
      type: 'VariableDeclaration',
      kind: 'var',
      declarations: Object.keys(context).map(function (variable) {
        return Base.assignment(context, variable, null);
      })
    };

    return [scope].concat(nodes);
  },

  run: function (context) {
    var result = null;
    this.nodes.forEach(function (node) {
      result = Base.getValue(node, context);
    });
    return result;
  },

  push: function (node) {
    this.nodes.push(node);
    return this;
  }
});

Nodes.wrap = function (node) {
  if (node.length === 1 && node instanceof Nodes) {
    return node[0];
  } else {
    return new Nodes(node);
  }
};

module.exports = Nodes;
