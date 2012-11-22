function FunctionExpression(id, params, body, opts) {
  return {
    type: 'FunctionExpression',
    id: id,
    params: params,
    body: {
      type: 'BlockStatement',
      body: body
    }
  }
}

module.exports = FunctionExpression;
