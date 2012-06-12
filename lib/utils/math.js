(function () {
var foldl = function foldl(fn, list) {
    return Array.prototype.reduce.call(list, fn);
};
var mod = function mod(a, b) {
    return a % b;
};
var square, sum, sub, prod, div, even, odd, abs;
this.square = square = function (x) {
    return x * x;
};
this.sum = sum = function () {
    return foldl(function (a, b) {
        return a + b;
    }, arguments);
};
this.sub = sub = function () {
    return foldl(function (a, b) {
        return a - b;
    }, arguments);
};
this.prod = prod = function () {
    return foldl(function (a, b) {
        return a * b;
    }, arguments);
};
this.div = div = function () {
    return foldl(function (a, b) {
        return a / b;
    }, arguments);
};
this.even = even = function (n) {
    return mod(n, 2) === 0;
};
this.odd = odd = function (n) {
    return !even(n);
};
this.abs = abs = function (n) {
    return Math.abs(n);
};
}.call(typeof module !== "undefined" ? module.exports : this))