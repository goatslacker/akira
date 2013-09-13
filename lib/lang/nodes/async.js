var ExpressionStatement = require('ast/ExpressionStatement')
var Identifier = require('ast/Identifier')
var ast = require('ast')
var createFunction = require('createFunction')
var makeArray = require('makeArray')

function Async(body, args) {
  this.body = body
  this.args = args;
}

Async.prototype.compile = function (context) {
  var scope = {
    $$$filename: context.$$$filename,
    $$$params: this.params
  };

  this.body.callback = true

  var body = ast(this.body, scope)
  var args = this.args ? ast(this.args, scope) : []
  args.push(Identifier('_$callback'))

  return createFunction(args, makeArray(ExpressionStatement(body)), scope)
}

module.exports = Async
