(function () {
var map = function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
};
var modules, path, include, src, dependencies;
modules = {};
path = require('path');
include = function (m) {
    var functions;
    functions = require(path.join(__dirname, m));
    return function () {
        var $$obj = functions;
        Object.keys($$obj).forEach(function (key) {
            modules[key] = $$obj[key];
        });
    }();
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
this.modules = modules;
this.dependencies = dependencies = {
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
    sum: [
        'foldl'
    ],
    sub: [
        'foldl'
    ],
    prod: [
        'foldl'
    ],
    div: [
        'foldl'
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
}.call(typeof module !== "undefined" ? module.exports : this))