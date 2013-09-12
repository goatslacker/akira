(function () {
    var CallExpression, ExpressionStatement, Identifier, MemberExpression, Store, TypeSystem, ast, escodegen, esprima, obj2str, unwrapExpressionStatement, vm, runMacro, checkCallType, unwrap, returnFunction, call;
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
            var type, tparams, paramsUnbalanced;
            try {
                type = Store.types[name];
                tparams = type.params;
                paramsUnbalanced = tparams.length !== params.length;
            } catch (ex) {
                paramsUnbalanced = null;
            }
            return paramsUnbalanced === true ? console.warn(('' + (name) + ' was signed with ' + (tparams.length) + ' ').concat('arguments yet it was provided with ' + (params.length) + ' ', 'at ' + (context.$$$filename) + ' line ' + (line) + '')) : null;
        }();
    };
    unwrap = function (xargs) {
        try {
            return map(unwrapExpressionStatement, xargs);
        } catch (ex) {
            return null;
        }
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
            var compile, callee, args;
            compile = ast.gen(context);
            callee = compile(ref);
            args = compile(params);
            return callee.type === 'Identifier' && Store.macros[callee.name] ? runMacro(callee.name, compile(params), context) : returnFunction(callee, args, params, context, line);
        };
    };
    module.exports = call;
}());