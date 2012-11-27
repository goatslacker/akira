module.exports = (function () {
    var VariableDeclaration;
    var map;
    map = function (f, vec) {
        return Array.prototype.map.call(vec, function (x) {
            return f(x);
        });
    };
    VariableDeclaration = function (declarations) {
        return {
            type: 'VariableDeclaration',
            declarations: map(function (declaration) {
                return {
                    type: 'VariableDeclarator',
                    id: declaration,
                    init: null
                };
            }, declarations),
            kind: 'var'
        };
    };
    return VariableDeclaration;
}());