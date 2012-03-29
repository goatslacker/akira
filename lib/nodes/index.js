const expressions = [
  'Arguments',
  'Assignment',
  'Bool',
  'Call',
  'CallMethod',
  'Compare',
  'Declaration',
  'HereComment',
  'If',
  'Literal',
  'Nodes',
  'Operation',
  'While'
];

var nodes = {};

expressions.forEach(function (expression) {
  nodes[expression] = require('./' + expression.toLowerCase());
});

module.exports = nodes;
