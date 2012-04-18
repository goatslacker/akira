var Base = require('./base');

var Declaration = function (name, params, body) {
  this.name = name;
  this.params = params;
  this.body = body;
  return this;
};

//var Assignment = require('./assignment');

Declaration.prototype = Base.extend({
  compile: function (context) {
//    var body = Base.compileValue(this.body, context);
//    var fn = this.name == null ? '' : 'var ' + this.name + ' = ';
//    Assignment.prototype.compile({}
    // TODO DRY this
    var id = this.name ? Base.compileValue(this.name, context) : null;

    var body = Base.compileValue(this.body, context);
    // HACK!
    body = Array.isArray(body) ? body.pop() : body
    // DOUBLE HACK!
//    body = (body.type === 'ExpressionStatement') ? body.expression : body;

    var fn = {
      type: 'FunctionExpression',
      id: id,
      params: Base.compileValue(this.params, context),
      body: {
        type: 'BlockStatement',
        body: [{
          type: 'ReturnStatement',
          argument: body
        }]
      }
    };

    if (id) {
      return {
        type: 'VariableDeclaration',
        kind: 'var',
        declarations: [{
          type: 'VariableDeclarator',
          id: id,
          init: fn
        }]
      };
    } else {
      return fn;
    }




//    return fn + 'function (' +
//      Base.compileValue(this.params, context) + ') {\n' +
//      'return ' + Base.compileValue(this.body, context) + '\n}';
  },
  run: function (context) {
    // TODO by only getting the last context, we can't dive deeper into closures?
    var declare = { params: this.params, body: this.body, context: context[context.length - 1] };
    if (this.name) {
      Base.setValue(this.name, declare, context);
    }
    return declare;
  }
});

module.exports = Declaration;
