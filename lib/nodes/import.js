var Base = require('./base');
var fs = require('fs');
var lexer = require('../lexer');
var parser = require('../parser').parser;
var util = require('util');

var Import = function (i) {
  this.i = i;
  return this;
};

Import.prototype.compile = function (context) {
  var self = {};
  var ast = '';
  var parsed = null;
  try {
    parsed = parser.parse(lexer.tokenize(fs.readFileSync(this.i).toString()));
    ast = parsed.compile(self);
    ast = parsed.addVars(self).concat(ast)
  } catch (e) {
    console.error(this.i);
    throw e;
  }
  var xform = {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: {
        type: 'FunctionExpression',
        id: null,
        params: [],
        body: {
          type: 'BlockStatement',
          body: ast
        }
      },
      property: {
        type: 'Identifier',
        name: 'call'
      }
    },
    arguments: [{ type: 'ThisExpression' }]
  };
  return xform;
};

module.exports = Import;
