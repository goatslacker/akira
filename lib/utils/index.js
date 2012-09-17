module.exports = (function ($$export) {
    var modules, path, include, src, dependencies;
    var merge = function merge(base, obj) {
        Object.keys(obj).forEach(function (key) {
            base[key] = obj[key];
        });
    };
    var map = function map(fn, list) {
        return Array.prototype.map.call(list, function (node, index, list) {
            return fn(node, index + 1, list);
        });
    };
    modules = {};
    path = require('path');
    include = function (m) {
        var functions;
        functions = require(path.join(__dirname, m));
        return merge(modules, functions);
    };
    src = [
        'javascript',
        'enumerable',
        'strings',
        'functions',
        'math',
        'debug'
    ];
    map(function (x) {
        return include(x);
    }, src);
    dependencies = {
        chars: [
            'map'
        ],
        words: [
            'map'
        ],
        lines: [
            'map'
        ],
        even: [
            'mod'
        ],
        odd: [
            'even',
            'mod'
        ],
        concat: [
            'foldl'
        ],
        count: [
            'filter'
        ],
        average: [
            'foldl'
        ],
        compact: [
            'filter'
        ],
        intersect: [
            'filter'
        ],
        max: [
            'foldl'
        ],
        min: [
            'foldl'
        ],
        nothing: [
            'filter'
        ],
        randomize: [
            'sort'
        ],
        unique: [
            'filter'
        ],
        assertDeep: [
            'assert',
            'filter'
        ]
    };
    return {
        modules: modules,
        dependencies: dependencies
    };
}());