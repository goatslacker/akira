var expressions = [
  'Arguments',
  'Assignment',
  'Call',
  'Compare',
  'Declaration',
  'Import',
  'Literal',
  'List',
  'Nodes',
  'Operation'
];

var nodes = {};

expressions.forEach(function (expression) {
  nodes[expression] = require('./' + expression.toLowerCase());
});

module.exports = nodes;
