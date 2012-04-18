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
  compile: function (context) {
    var nodes = this.nodes.map(function (node) {
      var foo = node.compile(context);
      foo = Array.isArray(foo) ? foo.pop() : foo;
      return { type: 'ExpressionStatement', expression: foo };
    });

    return nodes;

//    return {
//      type: 'Program',
//      body: nodes
//    };
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
