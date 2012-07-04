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
        Compare: r('compare'),
        Comprehension: r('comprehension'),
        Construction: r('construction'),
        Declaration: r('declaration'),
        Exception: r('exception'),
        Export: r('export'),
        If: r('if'),
        Identifier: r('identifier'),
        Import: r('import'),
        Literal: r('literal'),
        List: r('list'),
        Nodes: r('nodes'),
        Operation: r('operation'),
        Pattern: r('pattern'),
        Pipeline: r('pipeline'),
        Tuple: r('tuple')
    };
}());