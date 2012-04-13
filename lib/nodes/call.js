const Base = require('./base');

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
    var result = "";

    switch (this.ref) {
//    case "print":
//      result = Base.getValue(this.params, context);
//      if (context[0].env === "node") {
//        result = result.replace(/\\033/g, "\033"); // FIXME - leaving this in for now so tests can pass...
//      }
//      console.log.call(context[context.length - 1], result);
//      return result;
//    case "return":
//      result = Base.getValue(this.params, context);
//      return result;
//    case "assert":
//      var isTrue = this.params.run(context);
//      if (isTrue !== true) {
//        var expected = Base.getValue(this.params.compare[1], context);
//        var actual = Base.getValue(this.params.compare[0], context);
//        return "expected " + expected + " to be " + actual;
//      }
//      return isTrue;
    default:
      result = Base.getValue(this.ref, context);

      if (this.params) {
        var paramsVal = this.params.run(context);

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
  }
});

module.exports = Call;
