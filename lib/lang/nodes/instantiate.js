(function () {
    var ast, Instantiate;
    ast = require('ast');
    Instantiate = function () {
        var _$8d767b3;
        _$8d767b3 = function (iden) {
            this.iden = iden;
        };
        _$8d767b3.prototype.compile = function (context) {
            var name;
            name = ast(this.iden, context);
            return {
                type: 'NewExpression',
                callee: name.callee,
                arguments: name.arguments
            };
        };
        return _$8d767b3;
    }.apply(this, arguments);
    module.exports = Instantiate;
}());