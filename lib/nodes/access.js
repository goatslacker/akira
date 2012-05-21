var Base = require('./base');

var Access = function (id, prop) {
  this.id = id;
  this.prop = prop;
  return this;
};

Access.prototype = Base.extend({
  compile: function (context) {
    var prop = Base.compileValue(this.prop, context);

    return {
      type: 'MemberExpression',
      computed: false,
      object: Base.compileValue(this.id, context),
      property: prop
    };
  }
});

module.exports = Access;
