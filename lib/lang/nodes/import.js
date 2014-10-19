var Identifier = require('ast/Identifier')
var CallExpression = require('ast/CallExpression')
var Store = require('Store')
var esprima = require('esprima')
var fs = require('fs')
var genUniqueIdentifier = require('genUniqueIdentifier')
var lexer = require('../lexer')
var parser = require('../parser').parser
var path = require('path')
var traverse = require('traverse')
var implicitReturn = require('implicitReturn')
var fu = require('fu')

var paths = [
  path.join(__dirname, 'modules'),
  path.join(process.env.PWD, 'modules')
]

function loadjs(filepath, code) {
  return fu.concatMap(function (els) {
    return traverse(
      els,
      function (x) {
        if (!x) {
          return
        }
        if (x.type !== 'ExpressionStatement') {
          return x
        }

        var ex = x.expression

        if (ex.type === 'AssignmentExpression' &&
            ex.left.type === 'MemberExpression' &&
            ex.left.object.name === 'module' &&
            ex.left.property.name === 'exports') {

          return {
            type: 'ReturnStatement',
            argument: ex.right
          }
        }

        return x
      }
    )
  }, esprima.parse(code).body)
}

function loadakira(filepath, code) {
  var context = {}
  context.$$$filename = filepath
  var parsed = parser.parse(lexer(code))
  var body = parsed.compile(context, filepath)
  parsed.flagCoreMethods(body)
  var programBody = parsed.addVars(context).concat(parsed.addContracts(body))
  if (context.$$$exported) {
    programBody.push(context.$$$exported)
  }
  implicitReturn(programBody)
  return programBody
}

function Import(i) {
  this.i = i
}

Import.prototype.compile = function (context) {
  var filename = this.i

  if (Store.modules[filename]) {
    return CallExpression(Identifier(filename), [])
  }

  var allPaths = fu.concat(paths, [path.dirname(path.resolve(context.$$$filename))])
  var filepath = fu.head(fu.compact(fu.map(function (p) {
    try {
      fs.statSync(path.join(p, filename))
    } catch (e) {
      return null
    }

    return p
  }, allPaths)))

  filepath = filepath ? path.join(filepath, filename) : filename

  var relname = path.relative(process.env.PWD, filepath)
  var varname = genUniqueIdentifier(relname)

  if (!!Store.deps[varname]) {
    return Identifier(varname)
  }

  try {
    var code = fs.readFileSync(filepath).toString()
    if (path.extname(filepath) === '.js') {
      Store.deps[varname] = loadjs(filepath, code)
    } else {
      Store.deps[varname] = loadakira(filepath, code)
    }
  } catch (e) {
    console.error(this.i)
    throw e
  }

  return Identifier(varname)
}

module.exports = Import
