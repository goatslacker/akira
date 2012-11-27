module.exports = (function () {
    var AssignmentExpression;
    AssignmentExpression = function (left, right) {
        return {
            type: 'AssignmentExpression',
            operator: '=',
            left: left,
            right: right
        };
    };
    return AssignmentExpression;
}());