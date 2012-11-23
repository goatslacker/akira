function CallExpression(callee, args) {
  if (args == null) {
    args = [];
  }
  return {
    type: 'CallExpression',
    callee: callee,
    arguments: args
  }
}

module.exports = CallExpression;
