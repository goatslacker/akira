(function () {
    var CallExpression, ExpressionStatement, Identifier, MemberExpression, Store, TypeSystem, ast, escodegen, esprima, obj2str, unwrapExpressionStatement, vm, genAst, toNull, runMacro, checkCallType, unwrap, returnFunction, call;
    var map = function (f, vec) {
        return Array.prototype.map.call(vec, function () {
            return f(arguments[0]);
        });
    };
    CallExpression = require('ast/CallExpression');
    ExpressionStatement = require('ast/ExpressionStatement');
    Identifier = require('ast/Identifier');
    MemberExpression = require('ast/MemberExpression');
    Store = require('Store');
    TypeSystem = require('TypeSystem');
    ast = require('ast');
    escodegen = require('escodegen');
    esprima = require('esprima');
    obj2str = require('obj2str');
    unwrapExpressionStatement = require('unwrapExpressionStatement');
    vm = require('vm');
    genAst = function (context) {
        return function () {
            return ast(arguments[0], context);
        };
    };
    toNull = function (b) {
        return b === true ? true : null;
    };
    runMacro = function (name, xargs, context) {
        return function () {
            var code, args, ast;
            ast = Store.macros[name];
            args = esprima.parse(obj2str(xargs));
            code = escodegen.generate(ExpressionStatement(CallExpression(ast, args.body[0].expression.elements)));
            return vm.runInNewContext(code, context);
        }();
    };
    checkCallType = function (name, params, context, line) {
        return function () {
            var nonMatchingParameterLength, tparams, type;
            type = Store.types[name];
            if (type != null) {
                tparams = type.params;
                if (tparams != null) {
                    nonMatchingParameterLength = toNull(tparams.length !== params.length);
                    if (nonMatchingParameterLength != null) {
                        return console.warn(('' + (name) + ' was signed with ' + (tparams.length) + ' ').concat('arguments yet it was provided with ' + (params.length) + ' ', 'at ' + (context.$$$filename) + ' line ' + (line) + ''));
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
    returnFunction = function (callee, args, params, context, line) {
        checkCallType(callee.name, args, context, line);
        return params === 'apply' ? CallExpression(MemberExpression(callee, Identifier('apply')), [
            Identifier('null'),
            Identifier('arguments')
        ]) : CallExpression(callee, unwrap(args));
    };
    call = function (ref, params) {
        return function (line, context) {
            var ast, callee, args;
            ast = genAst(context);
            callee = ast(ref);
            args = ast(params);
            return callee.type === 'Identifier' && Store.macros[callee.name] ? runMacro(callee.name, ast(params), context) : returnFunction(callee, args, params, context, line);
        };
    };
    module.exports = call;
}());