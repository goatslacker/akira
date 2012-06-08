(function () {
function foldl(fn, list) {
    return Array.prototype.reduce.call(list, fn);
}
function mod(a, b) {
    return a % b;
}
var square, sum, sub, prod, div, even, odd, abs;
this.square = square = function square(x) {
    return x * x;
};
this.sum = sum = function sum() {
    return foldl(function (a, b) {
        return a + b;
    }, arguments);
};
this.sub = sub = function sub() {
    return foldl(function (a, b) {
        return a - b;
    }, arguments);
};
this.prod = prod = function prod() {
    return foldl(function (a, b) {
        return a * b;
    }, arguments);
};
this.div = div = function div() {
    return foldl(function (a, b) {
        return a / b;
    }, arguments);
};
this.even = even = function even(n) {
    return mod(n, 2) === 0;
};
this.odd = odd = function odd(n) {
    return !even(n);
};
this.abs = abs = function abs(n) {
    return Math.abs(n);
};
}.call(typeof module !== "undefined" ? module.exports : this))