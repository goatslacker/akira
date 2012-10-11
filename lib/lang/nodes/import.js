var Base = require('./base');
var fs = require('fs');
var path = require('path');
var esprima = require('esprima');
var lexer = require('../lexer');
var parser = require('../grammar');
var crypto = require('crypto');
var util = require('util');

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
  var shasum = crypto.createHash('sha1');

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

    var relname = path.relative(process.PWD, filepath);
    shasum.update(relname);

    self.$$$filename = filepath;

    var varname = '$$' + shasum.digest('hex').substr(0, 6);

    if (!!Base._deps[varname]) {
      return {
        type: 'Identifier',
        name: varname
      };
    }

    if (path.extname(filepath) === '.js') {
      ast = Base.concatMap(function (els) {
        return Base.traverse(
          els,
          function (x) {
            if (!x) return;
            if (x.type !== 'ExpressionStatement') return x;

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
      parsed.flagCoreMethods(ast, context);
    }

    Base._deps[varname] = ast;

  } catch (e) {
    console.error(this.i);
    throw e;
  }

  return {
    type: 'Identifier',
    name: varname
  };
};

module.exports = Import;
