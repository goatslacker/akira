module.exports = (function () {
    var CallExpression;
    CallExpression = function (callee, args) {
        switch (false) {
        case !(args === null && arguments.length === 2):
            return CallExpression(callee, []);
        case !(arguments.length === 2):
            return {
                type: 'CallExpression',
                callee: callee,
                arguments: args
            };
        }
    };
    return CallExpression;
}());