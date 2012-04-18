var Base = require('./base');

function getScope(result, paramsVal) {
  var paramsKey = result.params;
//  var local = result.context || {};
  var local = {};
  var len_key;
  var len_val;

  if (paramsKey && typeof paramsKey === "object") {

    len_key = paramsKey.args.length - 1;
    len_val = paramsVal.length;

    paramsKey.args.forEach(function (arg, index) {
      if (arg.substring(0, 1) === '_') {
        var l;

        if (index === len_key) {
          l = len_val;
        } else {
          l = len_val - (len_key - index);
        }

        local[arg.substr(1, arg.length)] = paramsVal.splice(0, l);
        return;
      }

      local[arg] = paramsVal.shift();
    });

  } else {
    local[paramsKey] = paramsVal.shift();
  }

  return local;
}

var Call = function (ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
};

Call.prototype = Base.extend({
  compile: function (context) {
    var args = Base.compileValue(this.params, context);
    if (!args) {
      args = [];
    }
    if (!Array.isArray(args)) {
      args = [args];
    }

    return {
      type: 'CallExpression',
      callee: Base.compileValue(this.ref, context),
      arguments: args
    };
  },

  run: function (context) {
    var result = Base.getValue(this.ref, context);
    var local = {};
    var scope = context.slice(0);
    var params;

    if (!result) {
      throw new ReferenceError(this.ref + ' is not defined');
    }

    if (this.params) {
      params = this.params.run(context);
      if (!Array.isArray(params)) {
        params = [params];
      } else {
        params = params.slice(0);
      }
    }

    if (typeof result === 'function') {
      return result.apply(result, params);
    }

    if (this.params) {
      local = getScope(result, params);
    }

    scope.push(local);

    result = Base.getValue(result.body, scope);
    return result;
//    return Array.isArray(result) ? [result] : result;
  }
});

module.exports = Call;
