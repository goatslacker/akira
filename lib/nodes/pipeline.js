var Base = require('./base');

function Pipeline(ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
}

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

  if (params.constructor.name === 'Call') {
    if (params.ref === '@') {
      params.ref = this.ref;
      return Base.compileValue(params, context);
    }
    if (params.ref.id === '@') {
      params.ref.id = this.ref;
      return Base.compileValue(params, context);
    }
  }

  if (k === 'params' &&
    params.ref &&
    params.ref.ref &&
    params.ref.ref.name === 'curryr'
  ) {
    return Base.functioncall(context, this.params, this.ref);
  }

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
    if (i === -1) {
      // TODO worry about operators and compare as well
      if (k === 'params') {
        params.params.args.push(this.ref);
      }
    } else {
      el[i] = this.ref;
    }
    return Base.compileValue(params, context);
  }

  if (params.id === '@') {
    params.id = this.ref;
    return Base.compileValue(params, context);
  }

  return Base.functioncall(context, this.params, this.ref);
};

module.exports = Pipeline;
