var ast = require('ast');

function Exception(tr, ca, t) {
  this.tr = tr;
  this.ca = ca;
  this.t = t;

  return this;
}

Exception.prototype.compile = function (context) {
  if (this.tr === 'raise') {
    return {
      type: 'ThrowStatement',
      argument: {
        type: 'NewExpression',
        callee: this.t ? ast(this.t, context) : { type: 'Identifier', name: 'Error' },
        arguments: [ast(this.ca, context)]
      }
    };
  }

  return {
    type: 'TryStatement',
    block: { type: 'BlockStatement', body: ast(this.tr, context) },
    handlers: [{
      type: 'CatchClause',
      param: { type: 'Identifier', name: 'err' },
      guard: null,
      body: { type: 'BlockStatement', body: ast(this.ca, context) }
    }],
    finalizer: null
  };
};

module.exports = Exception;
