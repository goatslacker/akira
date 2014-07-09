var addScope = require('addScope')
var ast = require('ast')
var AssignmentExpression = require('ast/AssignmentExpression')
var betaRedex = require('betaRedex')
var ExpressionStatement = require('ast/ExpressionStatement')
var getScope = require('getScope')
var Identifier = require('ast/Identifier')
var implicitReturn = require('implicitReturn')
var FunctionExpression = require('ast/FunctionExpression')
var MemberExpression = require('ast/MemberExpression')

function Class(construct, methods) {
  this.construct = construct
  this.methods = methods
}

Class.prototype.compile = function (context) {
  var scope = getScope(context, [])

  var className = Identifier('_$Class')
  scope[className.name] = true

  var construct = ast(this.construct, scope)
  var methods = ast(this.methods, scope)

  var constructor = [
    ExpressionStatement(
      AssignmentExpression(
        className,
        construct
      )
    )
  ]

  var body = constructor.concat(methods.map(function (method) {
    var name = Array.isArray(method) ? ast(method[0], context) : method.id

    var memberexpr = MemberExpression(
      MemberExpression(
        className,
        Identifier('prototype')
      ),
      name
    )

    if (Array.isArray(method)) {
      return ExpressionStatement(AssignmentExpression(
        memberexpr,
        ast(method[1], context)
      ))
    }

    return ExpressionStatement(AssignmentExpression(
      memberexpr,
      FunctionExpression(null, method.params, method.body.body)
    ))
  }))

  body.push(ExpressionStatement(className))
  implicitReturn(body)

  var node = betaRedex(addScope(scope, body))
  node.__class = true
  return node
}

module.exports = Class
