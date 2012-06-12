(function () {
var map = function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
};
var camelize, uppercase, capitalize, chars, condense, lines, repeat, words;
this.camelize = camelize = function (str) {
    return str.replace(/(-|_)+([a-zA-Z0-9$_])/g, function (i) {
        return i[1].toUpperCase();
    });
};
this.uppercase = uppercase = function (str) {
    return str.toUpperCase();
};
this.capitalize = capitalize = function (str) {
    return str[0].toUpperCase().concat(str.slice(1));
};
this.chars = chars = function (fn, str) {
    return map(fn, str.split(''));
};
this.condense = condense = function (str) {
    return str.replace(/\ /g, '');
};
this.lines = lines = function (fn, str) {
    return map(fn, str.split('\\n'));
};
this.repeat = repeat = function (times, str) {
    return new Array(times + 1).join(str);
};
this.words = words = function (fn, str) {
    return map(fn, str.split(' '));
};
}.call(typeof module !== "undefined" ? module.exports : this))