var Base = require('./base');

function Exception(tr, ca) {
  this.tr = tr;
  this.ca = ca;

  return this;
}

Exception.prototype.compile = function (context) {
  return {
    type: 'TryStatement',
    block: { type: 'BlockStatement', body: Base.compileValue(this.tr, context) },
    handlers: [{
      type: 'CatchClause',
      param: { type: 'Identifier', name: 'err' },
      guard: null,
      body: { type: 'BlockStatement', body: Base.compileValue(this.ca, context) }
    }],
    finalizer: null
  };
};

module.exports = Exception;
