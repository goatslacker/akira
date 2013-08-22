(function () {
    var CallExpression, Identifier, MemberExpression, Store, TypeSystem, ast, unwrapExpressionStatement, genAst, toNull, checkCallType, unwrap, call;
    var map = function (f, vec) {
        return Array.prototype.map.call(vec, function () {
            return f(arguments[0]);
        });
    };
    CallExpression = require('ast/CallExpression');
    Identifier = require('ast/Identifier');
    MemberExpression = require('ast/MemberExpression');
    Store = require('Store');
    TypeSystem = require('TypeSystem');
    ast = require('ast');
    unwrapExpressionStatement = require('unwrapExpressionStatement');
    genAst = function (context) {
        return function () {
            return ast(arguments[0], context);
        };
    };
    toNull = function (b) {
        return b === true ? true : null;
    };
    checkCallType = function (name, params, context, line) {
        return function () {
            var nonMatchingParameterLength, params, type;
            type = Store.types[name];
            if (type != null) {
                params = type.params;
                if (params != null) {
                    nonMatchingParameterLength = toNull(type.params.length !== params.length);
                    if (nonMatchingParameterLength != null) {
                        return console.warn(name.concat(' was signed with ', type.params.length, ' arguments yet it was provided with ', params.length, ' at ', context['$$$filename'], ' line ', line));
                    }
                }
            }
            return null;
        }.apply(this, arguments);
    };
    unwrap = function (xargs) {
        return function () {
            var args;
            args = xargs;
            if (args != null) {
                return map(unwrapExpressionStatement, args);
            }
            return null;
        }.apply(this, arguments);
    };
    call = function (ref, params) {
        return function (line, context) {
            var ast, callee, args;
            ast = genAst(context);
            callee = ast(ref);
            args = ast(params);
            checkCallType(ref.name, args, context, line);
            return params === 'apply' ? CallExpression(MemberExpression(callee, Identifier('apply')), [
                Identifier('null'),
                Identifier('arguments')
            ]) : CallExpression(callee, unwrap(args));
        };
    };
    module.exports = call;
}());