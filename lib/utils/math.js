module.exports = (function ($$export) {
    var square, sum, sub, prod, div, even, odd, abs, sqrt;
    var mod = function mod(a, b) {
        return a % b;
    };
    square = function (x) {
        return x * x;
    };
    sum = function (a, b) {
        return a + b;
    };
    sub = function (a, b) {
        return a - b;
    };
    prod = function (a, b) {
        return a * b;
    };
    div = function (a, b) {
        return a / b;
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
        even: even,
        odd: odd,
        abs: abs,
        sqrt: sqrt
    };
}());