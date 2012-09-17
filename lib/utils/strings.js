module.exports = (function ($$export) {
    var camelize, uppercase, capitalize, chars, condense, lines, repeat, words;
    var map = function map(fn, list) {
        return Array.prototype.map.call(list, function (node, index, list) {
            return fn(node, index + 1, list);
        });
    };
    camelize = function (str) {
        return str.replace(/(-|_)+([a-zA-Z0-9$_])/g, function (i) {
            return i[1].toUpperCase();
        });
    };
    uppercase = function (str) {
        return str.toUpperCase();
    };
    capitalize = function (str) {
        return str[0].toUpperCase().concat(str.slice(1));
    };
    chars = function (fn, str) {
        return map(fn, str.split(''));
    };
    condense = function (str) {
        return str.replace(/\ /g, '');
    };
    lines = function (fn, str) {
        return map(fn, str.split('\\n'));
    };
    repeat = function (times, str) {
        return function (arr) {
            return arr.join(str);
        }(new Array(times + 1));
    };
    words = function (fn, str) {
        return map(fn, str.split(' '));
    };
    return {
        camelize: camelize,
        uppercase: uppercase,
        capitalize: capitalize,
        chars: chars,
        condense: condense,
        lines: lines,
        repeat: repeat,
        words: words
    };
}());