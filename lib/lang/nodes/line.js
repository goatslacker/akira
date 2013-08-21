module.exports = function line(n, node) {
  if (node) {
    if (typeof node == 'function') {
      var newnode = node.bind(node, n + 1)
      // XXX so lame
      Object.keys(node).forEach(function (key) {
        newnode[key] = node[key]
      })
      return newnode
    } else {
      node.line = n + 1;
    }
  }
  return node;
};
