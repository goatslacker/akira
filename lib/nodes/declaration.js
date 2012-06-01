var Base = require('./base');

var Declaration = function (name, params, body) {
  this.name = name;
  this.params = params;
  this.body = body;
  return this;
};

Declaration.prototype.compile = function (context) {
  if (this.name) {
    if (context[this.name.name]) {
      throw new ReferenceError(this.name.name + ' is already defined');
    }
    context[this.name.name] = true;
  }

  return Base.functiondef({}, this.name, this.params, this.body);
};

module.exports = Declaration;
