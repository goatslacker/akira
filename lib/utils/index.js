(function () {
function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
var modules, path, include, src, dependencies;
modules = {};
path = require('path');
include = function include(mod) {
    var functions;
    functions = require(path.join(__dirname, mod));
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
    ]
};
}.call(typeof module !== "undefined" ? module.exports : this))