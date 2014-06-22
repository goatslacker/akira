(function () {
    var MemberExpression, ast, unwrapExpressionStatement, Access;
    MemberExpression = require('ast/MemberExpression');
    ast = require('ast');
    unwrapExpressionStatement = require('unwrapExpressionStatement');
    Access = function () {
        var _$8d767b2;
        _$8d767b2 = function (id, prop) {
            this.akiraName = 'Access';
            this.id = id;
            this.prop = prop;
        };
        _$8d767b2.prototype.compile = function (context) {
            var id, prop, computed;
            id = unwrapExpressionStatement(ast(this.id, context));
            prop = ast(this.prop, context);
            computed = prop.type === 'Literal';
            return MemberExpression(id, prop, computed);
        };
        return _$8d767b2;
    }.apply(this, arguments);
    module.exports = Access;
}());