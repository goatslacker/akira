var expressions = [
  'Access',
  'Arguments',
  'Assert',
  'Assignment',
  'Call',
  'Compare',
  'Declaration',
  'Export',
  'If',
  'Import',
  'Literal',
  'List',
  'Nodes',
  'Operation',
  'Pattern',
  'Tuple'
];

var nodes = {};

expressions.forEach(function (expression) {
  nodes[expression] = require('./' + expression.toLowerCase());
});

module.exports = nodes;
