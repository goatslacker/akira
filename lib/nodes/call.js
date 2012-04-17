var Base = require('./base');

var Call = function (ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
};

Call.prototype = Base.extend({

  run: function (context) {
    var result = Base.getValue(this.ref, context);
    var paramsVal;

    if (this.params) {
      paramsVal = this.params.run(context);

      if (!Array.isArray(paramsVal)) {
        paramsVal = [paramsVal];
      }

      // don't mutate params
      paramsVal = paramsVal.slice(0);
    }

    if (result) {

      if (typeof result === "function") {
        return result.apply(result, paramsVal);
      } else {
        var runner = result;
        var paramsKey = runner.params;

        var local = runner.context || {};

        if (this.params) {
          if (paramsKey && typeof paramsKey === "object") {

            var len = paramsKey.args.length - 1;
//            console.log(this.ref, paramsVal, paramsKey);

            paramsKey.args.forEach(function (arg, index) {
              if (arg.substring(0, 1) === '_') {
                var l;

                if (index === len) {
                  l = paramsVal.length;
                } else {
                  l = paramsVal.length - (len - index);
                }

                local[arg.substr(1, arg.length)] = paramsVal.splice(0, l);
                return;
              }

              local[arg] = paramsVal.shift();
            });

          } else {
            local[paramsKey] = paramsVal.shift();
          }
        }

        var callee = runner.body;

        var scope = context.slice(0);
        scope.push(local);

        var val = Base.getValue(callee, scope);
//        console.log(val);
        return Array.isArray(val) ? [val] : val;
//        return val;
      }
    } else {
      throw this.ref + " is not defined"; // TODO toss in an error require... use interpolation.
    }
  }
});

module.exports = Call;
