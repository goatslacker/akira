module.exports = (function () {
    var FunctionExpression;
    FunctionExpression = function (id, params, body, opts) {
        return {
            type: 'FunctionExpression',
            id: id,
            params: params,
            body: {
                type: 'BlockStatement',
                body: body
            }
        };
    };
    return FunctionExpression;
}());