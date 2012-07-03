var Base = require('./base');
var fs = require('fs');
var path = require('path');
var lexer = require('../lexer');
var parser = require('../grammar').parser;
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
    parsed = parser.parse(lexer.tokenize(fs.readFileSync(filepath).toString()));
    ast = parsed.compile(self);
    ast = parsed.addVars(self).concat(ast)

// supposed to add exported symbols into context
//    Object.keys(self).forEach(function (k) {
//      var item = self[k];
//      if (item.__exports) {
//        context[k] = item;
//      }
//    });
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
