var Base = require('./base');
var fs = require('fs');
var path = require('path');
var lexer = require('../lexer');
var parser = require('../grammar');
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
  var ast = '';
  var parsed = null;
  var filename = this.i;

  var filepath = paths.map(function (p) {
    try {
      fs.statSync(path.join(p, filename));
    } catch (e) {
      return null;
    }

    return p;
  }).filter(function (x) { return !!x }).pop();

  try {
    if (filepath) {
      filepath = path.join(filepath, filename);
    } else {
      filepath = filename;
    }

    self.$$$filename = filepath;

    // resolve cyclic dependencies, return an empty stmt
    if (Base._dependencies[filepath]) {
      return false;
    }
    Base._dependencies[filepath] = true;

    parsed = parser.parse(lexer(fs.readFileSync(filepath).toString()));
    ast = parsed.compile(self);
    ast = parsed.addVars(self).concat(ast)

// dont leak out any utils that we're not really using
    context.$$$exports = context.$$$exports || {};

    Object.keys(self).forEach(function (k) {
      var item = self[k];
      if (!Base.utilExists(k)) {
        context.$$$exports[k] = item;
      }
    });
  } catch (e) {
    console.error(this.i);
    throw e;
  }
  var xform = {
    type: 'CallExpression',
    callee: {
      type: 'FunctionExpression',
      id: null,
      params: [{ type: 'Identifier', name: '$$export' }],
      body: {
        type: 'BlockStatement',
        body: ast
      }
    },
    arguments: []
  };
  return xform;
};

module.exports = Import;
