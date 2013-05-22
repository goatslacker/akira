var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var ast = require('ast')
var createFunction = require('createFunction')
var makeArray = require('makeArray')

var iife = function (body, args, params, scope) {
  return CallExpression(
    createFunction(args, makeArray(ExpressionStatement(body)), scope), params)
}


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

  return iife(body, [], [], scope)
}

module.exports = Let
