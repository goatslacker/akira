var Base = require('./base');

var Declaration = function (name, params, body) {
  this.name = name;
  this.params = params;
  this.body = body;
  return this;
};

Declaration.prototype = Base.extend({
  compile: function (context) {
    // TODO DRY this
    var id = this.name ? Base.compileValue(this.name, context) : null;
    var params = Base.compileValue(this.params, context);

    var body = Base.compileValue(this.body, context);
    if (!Array.isArray(body)) {
      body = [body];
    }
    var ret = body[body.length - 1];
    if (ret.type === 'IfStatement') {
      var ret1 = ret.consequent.body[ret.consequent.body.length - 1];
      var ret2 = ret.alternate.body[ret.alternate.body.length - 1];

      ret.consequent.body[ret.consequent.body.length - 1] = {
        type: 'ReturnStatement',
        argument: ret1.type === 'ExpressionStatement' ? ret1.expression : ret1
      };

      ret.alternate.body[ret.alternate.body.length - 1] = {
        type: 'ReturnStatement',
        argument: ret2.type === 'ExpressionStatement' ? ret2.expression : ret2
      };

    } else {
      body[body.length - 1] = {
        type: 'ReturnStatement',
        argument: ret.type === 'ExpressionStatement' ? ret.expression : ret
      };
    }

    var fn = {
      type: 'FunctionExpression',
      id: id,
      params: params || [],
      body: {
        type: 'BlockStatement',
        body: body
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
