var Base = require('./base');

var Pipeline = function (ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
};

Pipeline.prototype.compile = function (context) {
  var params = this.params;

  var piped = {
    'params': ['params', 'args'],
    'compare': 'compare',
    'operators': 'operators'
  };

  var k = Object.keys(piped).filter(function (key) {
    return params.hasOwnProperty(key);
  }).pop();

  if (k) {
    var keys = piped[k];
    var el = params;
    if (Array.isArray(keys)) {
      keys.forEach(function (key) {
        el = el[key];
      });
    } else {
      el = params[keys];
    }
    var i = el.indexOf('@');
    el[i] = this.ref;
    return Base.compileValue(this.params, context);
  }

  return Base.functioncall(context, this.params, this.ref);
};

module.exports = Pipeline;
