(function () {
    var path, r;
    path = require('path');
    r = function (m) {
        return require(path.join(__dirname, m.toLowerCase()));
    };
    module.exports = {
        Access: r('access'),
        Arguments: r('arguments'),
        Assignment: r('assignment'),
        Async: r('async'),
        Call: r('call'),
        Cloning: r('cloning'),
        Compare: r('compare'),
        Cond: r('cond'),
        Declaration: r('declaration'),
        Exception: r('exception'),
        ExceptionGuard: r('exception-guard'),
        Export: r('export'),
        Evaluate: r('evaluate'),
        If: r('if'),
        Identifier: r('identifier'),
        Import: r('import'),
        Let: r('let'),
        L: r('line'),
        Literal: r('literal'),
        Logic: r('logic'),
        Macro: r('macro'),
        Map: r('map'),
        MaybeSeq: r('maybeseq'),
        Modules: r('modules'),
        Nodes: r('nodes'),
        Operation: r('operation'),
        Pattern: r('pattern'),
        Pipeline: r('pipeline'),
        Recur: r('recur'),
        Type: r('type'),
        TypeSignature: r('typesignature'),
        Vector: r('vector')
    };
}());