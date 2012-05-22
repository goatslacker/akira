var expressions = [
  'Access',
  'Arguments',
  'Assignment',
  'Call',
  'Compare',
  'Construction',
  'Declaration',
  'Export',
  'If',
  'JavaScript',
  'Import',
  'Literal',
  'List',
  'Nodes',
  'Operation',
  'Pattern',
  'Tuple',
  'Utils'
];

var nodes = {};

expressions.forEach(function (expression) {
  nodes[expression] = require('./' + expression.toLowerCase());
});

module.exports = nodes;
