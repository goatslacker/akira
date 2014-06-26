var CallExpression = require('ast/CallExpression')
var MemberExpression = require('ast/MemberExpression')
var Identifier = require('ast/Identifier')
var ast = require('ast')

function Do(call, f) {
  this.call = call
  this.f = f
}

Do.prototype.compile = function (context) {
  var call = ast(this.call, context)
  var f = ast(this.f, context)

  return CallExpression(
    MemberExpression(call, Identifier('then')),
    [f]
  )
}

module.exports = Do
