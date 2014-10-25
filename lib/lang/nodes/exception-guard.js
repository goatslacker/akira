var Identifier = require('ast/Identifier')
var ExpressionStatement = require('ast/ExpressionStatement')
var ast = require('ast')

var makeArray = require('z/makeArray')

function makeBlock(expr) {
  return {
    type: 'BlockStatement',
    body: makeArray(expr)
  }
}

function ExceptionGuard(tr, id, ca) {
  this.tr = tr
  this.id = id
  this.ca = ca

  return this
}

ExceptionGuard.prototype.compile = function (context) {
  return {
    type: 'TryStatement',
    block: makeBlock(ExpressionStatement(ast(this.tr, context))),
    handlers: [{
      type: 'CatchClause',
      param: ast(this.id, context),
      guard: null,
      body: makeBlock(ExpressionStatement(ast(this.ca, context)))
    }],
    finalizer: null
  }
}

module.exports = ExceptionGuard
