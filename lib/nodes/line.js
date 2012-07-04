module.exports = function line(n, node) {
  if (node) {
    node.line = n;
  }
  return node;
};
