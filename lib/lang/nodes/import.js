var Identifier = require('ast/Identifier');
var CallExpression = require('ast/CallExpression')
var Store = require('Store');
var concatMap = require('concatMap');
var esprima = require('esprima');
var fs = require('fs');
var genUniqueIdentifier = require('genUniqueIdentifier');
var lexer = require('../lexer');
var parser = require('../parser').parser;
var path = require('path');
var traverse = require('traverse');
var util = require('util');
var implicitReturn = require('implicitReturn')

var paths = [
  path.join(__dirname, 'modules'),
  path.join(process.env.PWD, 'modules')
];

function Import(i) {
  this.i = i;
  return this;
}

Import.prototype.compile = function (context) {
  var self = {};
  var ast = {};
  var parsed = null;
  var filename = this.i;
  var varname;

  if (Store.modules[this.i]) {
    return CallExpression(Identifier(this.i), [])
  }

  // TODO lz
  var filepath = paths
    .concat([path.dirname(path.resolve(context.$$$filename))])
    .map(function (p) {
      try {
        fs.statSync(path.join(p, filename));
      } catch (e) {
        return null;
      }

      return p;
    })
    .filter(function (x) { return !!x })
    .pop();

  try {
    if (filepath) {
      filepath = path.join(filepath, filename);
    } else {
      filepath = filename;
    }

    var relname = path.relative(process.env.PWD, filepath);

    self.$$$filename = filepath;

    varname = genUniqueIdentifier(relname);

    if (!!Store.deps[varname]) {
      return Identifier(varname);
    }

    if (path.extname(filepath) === '.js') {
      ast = concatMap(function (els) {
        return traverse(
          els,
          function (x) {
            if (!x) {
              return;
            }
            if (x.type !== 'ExpressionStatement') {
              return x;
            }

            var ex = x.expression;

            if (ex.type === 'AssignmentExpression' &&
                ex.left.type === 'MemberExpression' &&
                ex.left.object.name === 'module' &&
                ex.left.property.name === 'exports') {

              return {
                type: 'ReturnStatement',
                argument: ex.right
              };
            }

            return x;
          }
        );
      }, esprima.parse(fs.readFileSync(filepath).toString()).body);
    } else {
      parsed = parser.parse(lexer(fs.readFileSync(filepath).toString()));
      ast = parsed.compile(self);
      ast = parsed.addVars(self).concat(ast);
      parsed.flagCoreMethods(ast);
      ast = parsed.addContracts(ast);

      if (self.$$$exported) {
        ast.push(self.$$$exported)
      }
      implicitReturn(ast);
    }

    Store.deps[varname] = ast;

  } catch (e) {
    console.error(this.i);
    throw e;
  }

  return Identifier(varname);
};

module.exports = Import;
