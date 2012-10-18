module.exports = (function ($$export) {
    var path, r;
    path = require('path');
    r = function (m) {
        return require(path.join(__dirname, m.toLowerCase()));
    };
    return {
        Access: r('access'),
        Arguments: r('arguments'),
        Assignment: r('assignment'),
        Call: r('call'),
        Cloning: r('cloning'),
        Compare: r('compare'),
        Comprehension: r('comprehension'),
        Declaration: r('declaration'),
        Exception: r('exception'),
        Export: r('export'),
        If: r('if'),
        Identifier: r('identifier'),
        Import: r('import'),
        L: r('line'),
        Literal: r('literal'),
        List: r('list'),
        Macro: r('macro'),
        Map: r('map'),
        Nodes: r('nodes'),
        Operation: r('operation'),
        Pattern: r('pattern'),
        Pipeline: r('pipeline'),
        Recur: r('recur')
    };
}());