var expressions = [
  'Arguments',
  'Assignment',
  'Bool',
  'Call',
  'Compare',
  'Declaration',
  'Import',
  'Literal',
  'Nodes',
  'Operation'
];

var nodes = {};

expressions.forEach(function (expression) {
  nodes[expression] = require('./' + expression.toLowerCase());
});

module.exports = nodes;
