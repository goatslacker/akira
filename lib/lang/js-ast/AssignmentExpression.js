function AssignmentExpression(left, right) {
  return {
    type: 'AssignmentExpression',
    operator: '=',
    left: left,
    right: right
  }
}

module.exports = AssignmentExpression;
