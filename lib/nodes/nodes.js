const Base = require('./base');

var Nodes = function (nodes) {
  this.nodes = [];
  this.nodes.push(nodes);
  return this;
};

Nodes.prototype = Base.extend({
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
