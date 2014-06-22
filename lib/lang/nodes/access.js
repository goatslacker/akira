(function () {
    var MemberExpression, ast, unwrapExpressionStatement, Access;
    MemberExpression = require('ast/MemberExpression');
    ast = require('ast');
    unwrapExpressionStatement = require('unwrapExpressionStatement');
    Access = function () {
        var _$8d767b1;
        _$8d767b1 = function (id, prop) {
            this.id = id;
            this.prop = prop;
        };
        _$8d767b1.prototype.compile = function (context) {
            var id, prop, computed;
            id = unwrapExpressionStatement(ast(this.id, context));
            prop = ast(this.prop, context);
            computed = prop.type === 'Literal';
            return MemberExpression(id, prop, computed);
        };
        return _$8d767b1;
    }.apply(this, arguments);
    Access.prototype.akiraName = 'Access';
    module.exports = Access;
}());