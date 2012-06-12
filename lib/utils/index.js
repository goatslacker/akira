(function () {
var map = function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
};
var chars = function (fn, str) {
    return map(fn, str.split(''));
};
var words = function (fn, str) {
    return map(fn, str.split(' '));
};
var lines = function (fn, str) {
    return map(fn, str.split('\\n'));
};
var mod = function mod(a, b) {
    return a % b;
};
var even = function (n) {
    return mod(n, 2) === 0;
};
var odd = function (n) {
    return !even(n);
};
var foldl = function foldl(fn, list) {
    return Array.prototype.reduce.call(list, fn);
};
var sum = function () {
    return foldl(function (a, b) {
        return a + b;
    }, arguments);
};
var sub = function () {
    return foldl(function (a, b) {
        return a - b;
    }, arguments);
};
var prod = function () {
    return foldl(function (a, b) {
        return a * b;
    }, arguments);
};
var div = function () {
    return foldl(function (a, b) {
        return a / b;
    }, arguments);
};
var concat = function () {
    return foldl(function (a, b) {
        return a.concat(b);
    }, arguments);
};
var filter = function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
};
var count = function (fn, list) {
    return filter(fn, list).length;
};
var average = function (list) {
    return foldl(function (a, b) {
        return a + b;
    }, list) / list.length;
};
var compact = function (list) {
    return filter(function (x) {
        return !(!x);
    }, list);
};
var intersect = function (list1, list2) {
    return filter(function (x) {
        return 0 - 1 !== list2.indexOf(x);
    }, list1);
};
var max = function (list) {
    return foldl(function (a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }, list);
};
var min = function (list) {
    return foldl(function (a, b) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }, list);
};
var nothing = function (fn, list) {
    return filter(fn, list).length === 0;
};
var sort = function sort(fn, list) {
    return Array.prototype.sort.call(list.slice(0), function (a, b) {
        return fn(a, b);
    });
};
var randomize = function (list) {
    return sort(function () {
        return Math.random() > 0.5;
    }, list);
};
var unique = function (list) {
    return filter(function (x, i) {
        return i === list.indexOf(x);
    }, list);
};
var assert = function (a, b) {
    if (!assert.successes) {
        (function () {
            var $$obj = {
                    successes: [],
                    failures: []
                };
            Object.keys($$obj).forEach(function (key) {
                assert[key] = $$obj[key];
            });
        }());
    } else {
        null;
    }
    if (a === b) {
        return assert.successes.push([
            a,
            b
        ]);
    } else {
        return assert.failures.push([
            a,
            b
        ]);
    }
};
var assertDeep = function (a, b) {
    var len;
    len = filter(function (x, i) {
        return x === b[i - 1];
    }, a).length;
    return assert(len, a.length);
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
        'assert'
    ]
};
}.call(typeof module !== "undefined" ? module.exports : this))