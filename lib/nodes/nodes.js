var Base = require('./base');

var Nodes = function (nodes) {
  this.nodes = [];
  nodes && this.nodes.push(nodes);
  return this;
};

Nodes.prototype = Base.extend({
  compile: function (context) {
    return this.nodes.map(function (node) {
      var foo = node.compile(context);
      return foo;
    });

    return {
      type: 'Program',
      body: this.nodes.map(function (node) {
        var foo = node.compile(context);
        return foo;
      })
    };
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

module.exports = Nodes;
