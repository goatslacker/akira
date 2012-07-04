module.exports = function line(n, node) {
  if (node) {
    node.line = n + 1;
  }
  return node;
};
