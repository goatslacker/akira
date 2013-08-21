var Identifier = require('ast/Identifier')
var FunctionExpression = require('ast/FunctionExpression')
var VariableDeclaration = require('ast/VariableDeclaration')
var Store = require('Store')

var addScope = require('addScope');
var ast = require('ast')

function Modules(name, body) {
  this.name = name
  this.body = body
}

Modules.prototype.compile = function (context) {
  Store.modules[this.name] = true

  var scope = {
    $$$filename: context.$$$filename
  }
  var body = ast(this.body, scope)

  return VariableDeclaration([
    [Identifier(this.name),
    FunctionExpression(null, null, addScope(scope, body))]
  ])
}

module.exports = Modules
