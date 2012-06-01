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
  'Identifier',
  'Import',
  'Literal',
  'List',
  'Nodes',
  'Operation',
  'Pattern',
  'Pipeline',
  'Tuple'
];

var nodes = {};

expressions.forEach(function (expression) {
  nodes[expression] = require('./' + expression.toLowerCase());
});

module.exports = nodes;
