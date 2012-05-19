var Base = require('./base');
var esprima = require('esprima');

var JavaScript = function (code) {
  this.code = code;
  return this;
};

JavaScript.prototype = Base.extend({
  compile: function () {
    var ast = esprima.parse('(function () {\n' + this.code + '}.call(this))');
    return ast.body[0];
  }
});

module.exports = JavaScript;
