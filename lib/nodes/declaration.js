var Base = require('./base');

var Declaration = function (name, params, body) {
  this.name = name;
  this.params = params;
  this.body = body;
  return this;
};

Declaration.prototype = Base.extend({
  compile: function (context) {
    return Base.functiondef({}, this.name, this.params, this.body);
  }
});

module.exports = Declaration;
