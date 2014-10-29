var addScope = require('z/addScope')
var ast = require('ast')
var createFunction = require('z/createFunction')
var getScope = require('z/getScope')
var FunctionExpression = require('ast/FunctionExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var AssignmentExpression = require('ast/AssignmentExpression')
var MemberExpression = require('ast/MemberExpression')
var Identifier = require('ast/Identifier')
var implicitReturn = require('z/implicitReturn')
var traverse = require('z/traverse')

var CallExpression = require('ast/CallExpression')

function ClassMethod(name, params, body) {
  this.name = name
  this.params = params
  this.body = body
}

ClassMethod.prototype.compile = function (context) {
  var scope = getScope(context, this.params)

  var name = null
  if (this.name) {
    name = ast(this.name, context)
  }

  if (this.params) {
    var params = ast(this.params, context)
    var keys = params.reduce(function (body, param) {
      if (param.__key) {
        return body.concat(ExpressionStatement(AssignmentExpression(
          MemberExpression(Identifier('this'), param),
          param
        )))
      }
      return body
    }, [])
  } else {
    var params = []
    var keys = []
  }

  var body = ast(this.body, scope)

  if (!Array.isArray(body)) {
    body = ExpressionStatement(body)
  }

  body = traverse(keys.concat(body), function (node) {
    if (node.type === 'FunctionExpression') {
      var hasThis = false
      traverse(node.body, function (x) {
        hasThis = hasThis || (
          x.type === 'ThisExpression' ||
          (x.type === 'Identifier' && x.name === 'this')
        )
      })

      if (hasThis) {
        return CallExpression(
          MemberExpression(node, Identifier('bind')),
          [Identifier('this')]
        )
      }
    }
    return node
  })

  if (this.name) {
    implicitReturn(body)
  }

  return FunctionExpression(name, params, addScope(scope, body))
}

module.exports = ClassMethod
