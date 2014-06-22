var addScope = require('addScope')
var ast = require('ast')
var AssignmentExpression = require('ast/AssignmentExpression')
var betaRedex = require('betaRedex')
var ExpressionStatement = require('ast/ExpressionStatement')
var genUniqueIdentifier = require('genUniqueIdentifier');
var Identifier = require('ast/Identifier')
var implicitReturn = require('implicitReturn')
var FunctionExpression = require('ast/FunctionExpression')
var MemberExpression = require('ast/MemberExpression')

function Class(construct, methods) {
  this.construct = construct
  this.methods = methods
}

Class.prototype.compile = function (context) {
  var scope = {
    $$$filename: context.$$$filename,
    $$$params: this.params
  };

  var className = Identifier(
    genUniqueIdentifier(String(Date.now() * Math.random()))
  )
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

//  var body = [constructor]
//  body.push(ExpressionStatement(className))
//  implicitReturn(body)
//
//  return betaRedex(addScope(scope, body))

  var body = constructor.concat(methods.map(function (method) {
    var memberexpr = MemberExpression(
      MemberExpression(
        className,
        Identifier('prototype')
      ),
      method.id
    )

    return ExpressionStatement(AssignmentExpression(
      memberexpr,
      FunctionExpression(null, method.params, method.body.body)
    ))
  }))

  body.push(ExpressionStatement(className))
  implicitReturn(body)

  return betaRedex(addScope(scope, body))
}

module.exports = Class
