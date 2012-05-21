var Base = require('./base');

var Construction = function (id) {
  this.id = id;
  return this;
};

Construction.prototype = Base.extend({
  compile: function (context) {
    var call = Base.compileValue(this.id, context);
    call.type = 'NewExpression';
    return call;
  }
});

module.exports = Construction;
