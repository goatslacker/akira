(function () {
    var ast, CallExpression, FunctionExpression, Identifier, MemberExpression, xthen, Await;
    ast = require('ast');
    CallExpression = require('ast/CallExpression');
    FunctionExpression = require('ast/FunctionExpression');
    Identifier = require('ast/Identifier');
    MemberExpression = require('ast/MemberExpression');
    xthen = Identifier('then');
    Await = function () {
        var _$8d767b1;
        _$8d767b1 = function (call) {
            this.call = call;
        };
        _$8d767b1.prototype.compile = function (context) {
            var call, callback, node;
            call = ast(this.call, context);
            callback = FunctionExpression(null, [], []);
            node = CallExpression(MemberExpression(call, xthen), [callback]);
            node.__await = true;
            return node;
        };
        return _$8d767b1;
    }.apply(this, arguments);
    module.exports = Await;
}());