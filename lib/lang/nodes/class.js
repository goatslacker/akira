var addScope = require('z/addScope')
var ast = require('ast')
var AssignmentExpression = require('ast/AssignmentExpression')
var betaRedex = require('z/betaRedex')
var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var getScope = require('z/getScope')
var Identifier = require('ast/Identifier')
var implicitReturn = require('z/implicitReturn')
var FunctionExpression = require('ast/FunctionExpression')
var MemberExpression = require('ast/MemberExpression')
var Store = require('Store')

function Class(construct, methods, ifc, inherits) {
  this.construct = construct
  this.methods = methods
  this.ifc = ifc
  this.inherits = inherits
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

  var proto = MemberExpression(
    className,
    Identifier('prototype')
  )

  var inheritance = []

  if (this.inherits) {
    var inherits = ast(this.inherits, context)
    inheritance.push(ExpressionStatement(
      AssignmentExpression(
        proto,
        CallExpression(
          MemberExpression(Identifier('Object'), Identifier('create')),
          [MemberExpression(inherits, Identifier('prototype'))]
        )
      )
    ))
    var thesuper = ExpressionStatement(CallExpression(
      MemberExpression(inherits, Identifier('apply')),
      [Identifier('this'), Identifier('arguments')]
    ))
    construct.body.body.push(thesuper)
  }

  var body = constructor.concat(inheritance, methods.map(function (method) {
    var name = Array.isArray(method) ? ast(method[0], context).property : method.id

    var memberexpr = MemberExpression(proto, name)

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

  if (this.ifc) {
    if (!Store.interfaces[this.ifc.name]) {
      throw new ReferenceError('Interface ' + this.ifc.name + ' is undefined')
    }
    body.push(
      ExpressionStatement(CallExpression(
        Identifier('_$tg'),
        [Store.interfaces[this.ifc.name].keys, proto]
      ))
    )
  }

  body.push(ExpressionStatement(className))
  implicitReturn(body)

  var node = betaRedex(addScope(scope, body))
  node.__class = true
  return node
}

module.exports = Class
