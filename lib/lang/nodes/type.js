var ast = require('ast')
var fu = require('fu')

function unwrap(x) {
  if (x.or) {
    return x.or
  } else {
    return x
  }
}

function Type(args, type) {
  switch (type) {
    case 'async':
      this.async = args
    break
    case 'maybe':
      this.maybe = args
    break
    case 'or':
      this.or = fu.concatMap(unwrap, args)
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
