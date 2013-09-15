var BinaryExpression = require('ast/BinaryExpression')
var CallExpression = require('ast/CallExpression')
var ExpressionStatement = require('ast/ExpressionStatement')
var Identifier = require('ast/Identifier')
var IfStatement = require('ast/IfStatement')
var Literal = require('ast/Literal')
var MemberExpression = require('ast/MemberExpression')
var ast = require('ast')
var createFunction = require('createFunction')
var fu = require('fu')
var genUniqueIdentifier = require('genUniqueIdentifier')
var makeArray = require('makeArray')

var callback = Identifier('_$callback')

function Async(body, args) {
  this.body = body
  this.args = args;
}

Async.prototype.compile = function (context) {
  this.body.callback = true

  var scope = {
    $$$filename: context.$$$filename,
    $$$params: this.params
  };

  var body = ast(this.body, scope)
  var args = this.args ? ast(this.args, scope) : []

  var fnName = Identifier(genUniqueIdentifier(genUniqueIdentifier(String(Math.random()))))

  var curried = IfStatement(
    BinaryExpression('==', callback, Literal(null)),
    { type: 'ReturnStatement',
      argument: CallExpression(
        MemberExpression(fnName, Identifier('bind'), false),
        fu.concat([fnName], args)
      ) },
    null
  )

  var body = fu.concat([curried], makeArray(ExpressionStatement(body)))
  return createFunction(fu.concat(args, [callback]), body, scope, fnName)
}

module.exports = Async
