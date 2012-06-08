(function () {
function mod(a, b) {
    return a % b;
}
function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
var modules, path, include, src;
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
}.call(typeof module !== "undefined" ? module.exports : this))