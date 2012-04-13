var Base = require('./base');

var Call = function (ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
};

Call.prototype = Base.extend({

  compile: function () {
    console.log('function ' + this.ref + '(' +  this.params + ')');
  },

  run: function (context) {
    var result = Base.getValue(this.ref, context);
    var paramsVal;

    if (this.params) {
      paramsVal = this.params.run(context);

      if (!Array.isArray(paramsVal)) {
        paramsVal = [paramsVal];
      }
    }

    if (result) {

      if (typeof result === "function") {
        return result.apply(result, paramsVal);
      } else {
        var runner = result.slice(0);
        var paramsKey = runner.shift();

        var local = {};

        if (this.params) {
          if (typeof paramsKey === "object") {

            var len = paramsKey.args.length - 1;

            paramsKey.args.forEach(function (arg, index) {
              if (arg === '_') {
                var l;

                if (index === len) {
                  l = paramsVal.length;
                } else {
                  l = paramsVal.length - (len - index);
                }

                local[arg] = paramsVal.splice(0, l);
                return;
              }

              local[arg] = paramsVal.shift();
            });

          } else {
            local[paramsKey] = paramsVal.shift();
          }
        }

        var callee = runner.shift();

        var scope = context.slice(0);
        scope.push(local);

        result = callee.run ? callee.run(scope) : local[callee];
        return result;
      }
    } else {
      throw this.ref + " is not defined"; // TODO toss in an error require... use interpolation.
    }
  }
});

module.exports = Call;
