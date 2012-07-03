var Base = require('./base');

function Declaration(name, params, body) {
  this.name = name;
  this.params = params;
  this.body = body;
  return this;
}

Declaration.prototype.compile = function (context) {
  return Base.functiondef({}, this.name, this.params, this.body);
};

module.exports = Declaration;
