var ast = require('ast')
var concatMap = require('concatMap')

function unwrap(x) {
  if (x.or) {
    return x.or
  } else {
    return x
  }
}

function Type(args, type) {
  switch (type) {
    case 'maybe':
      this.maybe = args
    break
    case 'or':
      this.or = concatMap(unwrap, args)
    break
    case 'vector':
      this.vector = args.args
    break
    case 'map':
      this.map = args.args
    break
  }
}

Type.prototype.compile = function (context) {
  return []
}

module.exports = Type
