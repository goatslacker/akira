var ast = require('ast')
var ArrayExpression = require('ast/ArrayExpression')
var CallExpression = require('ast/CallExpression')
var Identifier = require('ast/Identifier')
var MemberExpression = require('ast/MemberExpression')
var ObjectExpression = require('ast/ObjectExpression')
var Store = require('Store')
var TypeSystem = require('TypeSystem')


function convertType(x) {
  switch (x) {
    case 'Vector':
      return 'Array'
    case 'Map':
      return 'Object'
    default:
      return x
  }
}

function getType(x) {
  return ['or', 'vector', 'map', 'maybe', 'async']
    .filter(function (type) {
      return x.hasOwnProperty(type)
    })
    .pop()
}

function compile(x) {
  switch (getType(x)) {
    case 'async':
      return CallExpression(
        MemberExpression(Identifier('_$tg'), Identifier('assert')),
        [MemberExpression(PromiseNode, Identifier('is'))]
      )
    case 'maybe':
      return compileMaybe(x)
    case 'or':
      return compileOr(x)
    break
    case 'vector':
      return ArrayExpression(x.vector.map(compile))
    break
    case 'map':
      return ObjectExpression(x.map.map(function (x) {
        return [Identifier(x.id.name), compile(x.val)]
      }))
    break
    default:
      return Store.types.hasOwnProperty(x.name)
        ? Store.types[x.name].retval
        : Identifier(convertType(x.name))
  }
}
function compileMaybe(x) {
  return CallExpression(
    MemberExpression(Identifier('_$tg'), Identifier('Maybe')),
    [compile(x.maybe)]
  )
}

function compileOr(x) {
  return CallExpression(
    MemberExpression(Identifier('_$tg'), Identifier('Or')),
    x.or.map(compile)
  )
}


function Interface(name, keyTypes) {
  this.name = name
  this.keys = keyTypes.args
}

Interface.prototype.compile = function (context) {
  Store.interfaces[this.name.name] = {
    keys: ObjectExpression(this.keys.map(function (key) {
      var id = ast(key[0], context)
      var type = compile(ast(key[1], context))
      return [id, type]
    })),
    file: context.$$$filename,
    line: this.line
  }

  return []
}

module.exports = Interface
