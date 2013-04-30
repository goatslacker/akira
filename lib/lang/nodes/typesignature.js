var ArrayExpression = require('ast/ArrayExpression')
var CallExpression = require('ast/CallExpression')
var Identifier = require('ast/Identifier')
var MemberExpression = require('ast/MemberExpression')
var Store = require('Store')
var TypeSystem = require('TypeSystem')

// XXX
function ObjectExpression(props) {
  return {
    type: 'ObjectExpression',
    properties: props.map(function (x) {
      return {
        type: 'Property',
        key: x[0],
        value: x[1],
        kind: 'init'
      }
    })
  }
}

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
  return ['or', 'vector', 'map', 'maybe']
    .filter(function (type) {
      return x.hasOwnProperty(type)
    })
    .pop()
}

function compile(x) {
  switch (getType(x)) {
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
      return Identifier(convertType(x.name))
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


function TypeSignature(iden, params, retval) {
  this.iden = iden;
  this.params = params
  this.retval = retval
  return this;
}

TypeSignature.prototype.compile = function (context) {
  if (Store.types.hasOwnProperty(this.iden.name)) {
    throw new ReferenceError(
      'The type signature for `' + this.iden.name +
      '` was redefined in ' + context.$$$filename + ' line ' + this.line +
      ' but it already exists in ' + Store.types[this.iden.name].file +
      ' line ' + Store.types[this.iden.name].line
    )
  }

  Store.types[this.iden.name] = {
    params: this.params.args.map(compile),
    retval: compile(this.retval),
    file: context.$$$filename,
    line: this.line
  }

  return []
}

module.exports = TypeSignature
