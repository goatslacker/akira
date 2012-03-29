const Base = require('./base');
const Runtime = require('../runtime');

var CallMethod = function (obj, method, params) {
  this.obj = obj;
  this.method = method;
  this.params = params;
  return this;
};

CallMethod.prototype = Base.extend({
  run: function (context) {
    var obj = Base.getValue(this.obj, context);

    var type = typeof obj;

    var self = new Runtime[type](obj);
    return self[this.method](this.params);
  }
});

module.exports = CallMethod;
