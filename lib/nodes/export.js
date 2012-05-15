var Base = require('./base');

var Export = function (i) {
  this.i = i;
  return this;
};

Export.prototype = Base.extend({
  compile: function (context) {
    return {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        computed: false,
        object: { type: 'ThisExpression' },
        property: { type: 'Identifier', name: this.i }
      },
      right: { type: 'Identifier', name: this.i }
    };
  },
  run: function (context) {
    parser.parse(lexer.tokenize(fs.readFileSync(this.i).toString())).run(context);
    return context;
  }
});

module.exports = Export;
