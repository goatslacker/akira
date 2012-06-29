(function () {
var foldl = function foldl(fn, list) {
    return Array.prototype.reduce.call(list, fn);
};
var mod = function mod(a, b) {
    return a % b;
};
var square, sum, sub, prod, div, _add, _sub, _mul, _div, even, odd, abs, sqrt;
this.square = square = function (x) {
    return x * x;
};
this.sum = sum = function (args) {
    args = Array.prototype.slice.call(arguments, 0)
    return foldl(function (a, b) {
        return a + b;
    }, args);
};
this.sub = sub = function (args) {
    args = Array.prototype.slice.call(arguments, 0)
    return foldl(function (a, b) {
        return a - b;
    }, args);
};
this.prod = prod = function (args) {
    args = Array.prototype.slice.call(arguments, 0)
    return foldl(function (a, b) {
        return a * b;
    }, args);
};
this.div = div = function (args) {
    args = Array.prototype.slice.call(arguments, 0)
    return foldl(function (a, b) {
        return a / b;
    }, args);
};
this._add = _add = function (a, b) {
    return a + b;
};
this._sub = _sub = function (a, b) {
    return a - b;
};
this._mul = _mul = function (a, b) {
    return a * b;
};
this._div = _div = function (a, b) {
    return a / b;
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
this.sqrt = sqrt = function (n) {
    return Math.sqrt(n);
};
}.call(typeof module !== "undefined" ? module.exports : this))