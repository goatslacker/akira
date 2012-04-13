var Base = require('./base');

var Declaration = function (name, params, body) {
  this.name = name;
  this.params = params;
  this.body = body;
  return this;
};

Declaration.prototype = Base.extend({
  run: function (context) {
    var declare = [this.params, this.body];
    if (this.name) {
      Base.setValue(this.name, declare, context);
    }
    return declare;
  }
});

module.exports = Declaration;
