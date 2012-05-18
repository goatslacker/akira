var Base = require('./base');
var fs = require('fs');
var lexer = require('../lexer');
var parser = require('../parser').parser;
var context = require('../runtime');
var util = require('util');

var Import = function (i) {
  this.i = i;
  return this;
};

Import.prototype = Base.extend({
  compile: function () {
    var ast = '';
    try {
      ast = parser.parse(lexer.tokenize(fs.readFileSync(this.i).toString())).compile([Object.create(context)]);
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
  }
});

module.exports = Import;
