(function () {
function map(fn, list) {
    return Array.prototype.map.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
var camelize, uppercase, capitalize, chars, compact, lines, repeat, words;
this.camelize = camelize = function camelize(str) {
    return str.replace(/(-|_)+([a-zA-Z0-9$_])/g, function (i) {
        return i[1].toUpperCase();
    });
};
this.uppercase = uppercase = function uppercase(str) {
    return str.toUpperCase();
};
this.capitalize = capitalize = function capitalize(str) {
    return str[0].toUpperCase().concat(str.slice(1));
};
this.chars = chars = function chars(fn, str) {
    return map(fn, str.split(''));
};
this.compact = compact = function compact(str) {
    return str.replace(/\ /g, '');
};
this.lines = lines = function lines(fn, str) {
    return map(fn, str.split('\\n'));
};
this.repeat = repeat = function repeat(times, str) {
    return new Array(times + 1).join(str);
};
this.words = words = function words(fn, str) {
    return map(fn, str.split(' '));
};
}.call(typeof module !== "undefined" ? module.exports : this))