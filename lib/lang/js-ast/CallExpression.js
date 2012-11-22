function CallExpression(callee, args) {
  return {
    type: 'CallExpression',
    callee: callee,
    arguments: args
  }
}

module.exports = CallExpression;
