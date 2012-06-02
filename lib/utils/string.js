(function () {
function concat() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
        return a.concat(b);
    });
}
function at(list, index) {
    return list[index - 1];
}
function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
function join(by, list) {
    return list.join(by);
}
var camelize, uppercase, capitalize, chars, compact, lines, pad, repeat, words;
camelize = function camelize(str) {
    return str.replace(/(-|_)+([a-zA-Z0-9$_])/g, function (i) {
        return i[1].toUpperCase();
    });
};
uppercase = function uppercase(str) {
    return str.toUpperCase();
};
capitalize = function capitalize(str) {
    return concat(uppercase(at(1, str)), str.slice(1));
};
chars = function chars(fn, str) {
    return map(fn, str.split(''));
};
compact = function compact(str) {
    return str.replace(' ', '');
};
lines = function lines(fn, str) {
    return map(fn, str.split('\\n'));
};
pad = function pad(padding, str) {
    return concat(str, concat(join(new Array(padding)), str));
};
repeat = function repeat(times, str) {
    return join(str, new Array(times));
};
words = function words(fn, str) {
    return map(fn, str.split(' '));
};
}.call(typeof module !== "undefined" ? module.exports : this))
