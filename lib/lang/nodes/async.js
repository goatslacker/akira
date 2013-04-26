var AssignmentExpression = require('ast/AssignmentExpression')
var CallExpression = require('ast/CallExpression')
var FunctionExpression = require('ast/FunctionExpression')
var Identifier = require('ast/Identifier')
var MemberExpression = require('ast/MemberExpression')
var ast = require('ast')
var createFunction = require('createFunction')

var util = require('util')

function wrap(exp) {
  if (exp.type === 'ExpressionStatement') {
    return exp
  }

  // XXX this is ugly, i shouldn't unwrap
  if (Array.isArray(exp)) {
    return exp[0]
  }
  return { type: 'ExpressionStatement', expression: exp }
}

function nameandcall(fn, context) {
  var boundName = null
  if (fn.length >= 2) {
    boundName = ast(fn.shift(), context)
  }
  var call = ast(fn.shift(), context)

  return [boundName, call, fn.shift()]
}

function compileShit(call, boundName, next) {
  if (call.type === 'CallExpression') {
    call.arguments.push(FunctionExpression(null, boundName.elements, Array.isArray(next) ? next : [wrap(next)]))
//    call.arguments.push(createFunction([boundName], Array.isArray(next) ? next : [wrap(next)], {}))
  }
  return call
}

function Async(body, args) {
  this.body = body.args.slice(0)
  this.args = args;
}

Async.prototype.compile = function (context) {
  var scope = {
    $$$filename: context.$$$filename,
    $$$params: this.params
  };

  var body = [null].concat(this.body.reverse()).reduce(function (a, b) {
    var fn = nameandcall(b, scope)
//    console.log(fn);
    if (a === null) {
      return CallExpression(
        Identifier('_$callback'),
        [fn[1]]
      )
    } else {
      if (fn[0] === null) {
        // XXX the array.isArray stuff is ugly. wtf.
        return Array.isArray(a) ? [wrap(fn[1])].concat(a) : [
          wrap(fn[1]),
          wrap(a)
        ]
      } else if (fn[2]) {
        return CallExpression(
          createFunction(fn[0].elements, a, scope),
          [fn[1]]
        )
      } else {
        return compileShit(fn[1], fn[0], a)
      }
    }
  })

  var args = this.args ? ast(this.args, scope) : []
  args.push(Identifier('_$callback'))

//  util.puts(util.inspect(body, false, Infinity))
  return createFunction(args, Array.isArray(body) ? body : [wrap(body)], scope)
}

module.exports = Async
