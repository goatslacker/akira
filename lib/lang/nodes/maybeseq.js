var AssignmentExpression = require('ast/AssignmentExpression')
var BinaryExpression = require('ast/BinaryExpression')
var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var IfStatement = require('ast/IfStatement')
var Literal = require('ast/Literal')
var ast = require('ast')
var betaRedex = require('betaRedex')
var createFunction = require('createFunction')
var makeArray = require('makeArray')

var first = function (xs) { return xs[0] }
var init = function (xs) { return xs.slice(1) }

function returnLastExpression(node, scope) {
  if (!node.expr) {
    throw new ReferenceError('I need to be an expression') // XXX
  }
  return  {
    type: 'ReturnStatement',
    argument: ast(node.expr, scope)
  }
}


function MaybeSeq(body) {
  this.body = body.args.slice(0)
}

MaybeSeq.prototype.compile = function (context) {
  var scope = {
    $$$filename: context.$$$filename,
    $$$params: []
  };

  var nodes = this.body.reverse()

  var body = [
    returnLastExpression(first(nodes), scope)
  ].concat(init(nodes)).reduce(function (nodes, node) {
    if (node.expr) {
      return [ExpressionStatement(ast(node.expr, scope))].concat(nodes)
    }

    var compiled = ast(node, scope)
    var test = BinaryExpression(
      '!=',
      compiled[0].expression.left,
      Literal(null)
    )

    return compiled.concat(IfStatement(test, makeArray(nodes), null))
  })

  body.push(Literal(null))

  var f = createFunction([], makeArray(ExpressionStatement(body)), scope)
  return betaRedex(f.body.body)
}

module.exports = MaybeSeq
