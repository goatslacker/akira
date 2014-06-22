var addScope = require('addScope')
var ast = require('ast')
var createFunction = require('createFunction')
var FunctionExpression = require('ast/FunctionExpression')
var implicitReturn = require('implicitReturn')

function ClassMethod(name, params, body) {
  this.name = name
  this.params = params
  this.body = body
}

ClassMethod.prototype.compile = function (context) {
  var scope = {
    $$$filename: context.$$$filename,
    $$$params: this.params
  }

  var name = null
  if (this.name) {
    name = ast(this.name, context)
  }

  var params = ast(this.params, context)
  var body = ast(this.body, scope)

  if (this.name) {
    implicitReturn(body)
  }

  return FunctionExpression(name, params, addScope(scope, body))
}

module.exports = ClassMethod
