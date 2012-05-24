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
  },
  run: function (context) {
    // TODO by only getting the last context, we can't dive deeper into closures?
    var declare = { params: this.params, body: this.body, context: context[context.length - 1] };
    if (this.name) {
      Base.setValue(this.name, declare, context);
    }
    return declare;
  }
});

module.exports = Declaration;
