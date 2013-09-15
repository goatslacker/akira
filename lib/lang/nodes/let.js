var ExpressionStatement = require('ast/ExpressionStatement')
var ast = require('ast')
var betaRedex = require('betaRedex')
var implicitReturn = require('implicitReturn')

function Let(body, ret) {
  this.body = body.args.slice(0)
  this.ret = ret
}

Let.prototype.compile = function (context) {
  var scope = {
    $$$filename: context.$$$filename,
    $$$params: []
  };

  var nodes = this.body.reverse()

  var body = [ast(this.ret, scope)]
  .concat(nodes).reduce(function (nodes, node) {
    return [ExpressionStatement(ast(node, scope))].concat(nodes)
  })

  implicitReturn(body)

  return betaRedex(body, scope)
}

module.exports = Let
