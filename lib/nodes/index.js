var expressions = [
  'Access',
  'Arguments',
  'Assignment',
  'Call',
  'Compare',
  'Construction',
  'Declaration',
  'Exception',
  'Export',
  'If',
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
