module.exports = (function ($$export) {
    var foldl = function foldl(fn, list) {
        return Array.prototype.reduce.call(list, fn);
    };
    var mod = function mod(a, b) {
        return a % b;
    };
    var square, sum, sub, prod, div, _add, _sub, _mul, _div, _compare, even, odd, abs, sqrt;
    square = function (x) {
        return x * x;
    };
    sum = function (args) {
        args = Array.prototype.slice.call(arguments, 0)
        return foldl(function (a, b) {
            return a + b;
        }, args);
    };
    sub = function (args) {
        args = Array.prototype.slice.call(arguments, 0)
        return foldl(function (a, b) {
            return a - b;
        }, args);
    };
    prod = function (args) {
        args = Array.prototype.slice.call(arguments, 0)
        return foldl(function (a, b) {
            return a * b;
        }, args);
    };
    div = function (args) {
        args = Array.prototype.slice.call(arguments, 0)
        return foldl(function (a, b) {
            return a / b;
        }, args);
    };
    _add = function (a, b) {
        return a + b;
    };
    _sub = function (a, b) {
        return a - b;
    };
    _mul = function (a, b) {
        return a * b;
    };
    _div = function (a, b) {
        return a / b;
    };
    _compare = function (op) {
        return function (a, b) {
            switch (false) {
            case !(op === '>'):
                return a > b;
            case !(op === '>='):
                return a >= b;
            case !(op === '<'):
                return a < b;
            case !(op === '<='):
                return a <= b;
            case !(op === '!='):
                return a !== b;
            case !(op === '=='):
                return a === b;
            default:
                throw new TypeError('Invalid comparison');
            }
        };
    };
    even = function (n) {
        return mod(n, 2) === 0;
    };
    odd = function (n) {
        return !even(n);
    };
    abs = function (n) {
        return Math.abs(n);
    };
    sqrt = function (n) {
        return Math.sqrt(n);
    };
    return {
        square: square,
        sum: sum,
        sub: sub,
        prod: prod,
        div: div,
        _add: _add,
        _sub: _sub,
        _mul: _mul,
        _div: _div,
        even: even,
        odd: odd,
        abs: abs,
        sqrt: sqrt
    };
}());