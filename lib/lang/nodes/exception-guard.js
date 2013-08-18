var Identifier = require('ast/Identifier')
var ast = require('ast')

function ExceptionGuard(tr, id, ca) {
  this.tr = tr
  this.id = id
  this.ca = ca

  return this
}

ExceptionGuard.prototype.compile = function (context) {
  return {
    type: 'TryStatement',
    block: { type: 'BlockStatement', body: ast(this.tr, context) },
    handlers: [{
      type: 'CatchClause',
      param: ast(this.id, context),
      guard: null,
      body: { type: 'BlockStatement', body: ast(this.ca, context) }
    }],
    finalizer: null
  }
}

module.exports = ExceptionGuard
