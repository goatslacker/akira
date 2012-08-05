var Base = require('./base');

function Pipeline(ref, params) {
  this.ref = ref;
  this.params = params;
  return this;
}

Pipeline.prototype.compile = function (context) {
  var params = this.params;

  // always push result from previous pipe into next function's arguments
  if (params.ref) {
    params.params.args.push(this.ref);
    return Base.compileValue(params, context);
  }

  var keys = [
    'operators',
    'compare'
  ];

  // inline any operations or comparisons or accesses
  if (params.params && params.params.args[0] === 'it') {
    var property = keys.filter(function (k) {
      return !!params.body[k];
    }).pop();

    if (property) {
      params.body[property][0] = this.ref;
    } else if (params.body.id === 'it') {
      params.body.id = this.ref;
    }

    return Base.compileValue(params.body, context);
  }

  return Base.functioncall(context, this.params, this.ref);
};

module.exports = Pipeline;
