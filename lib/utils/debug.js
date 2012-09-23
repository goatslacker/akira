module.exports = (function ($$export) {
    var eq, neq, gt, lt, gte, lte, assert, assertDeep;
    var filter = function filter(fn, list) {
        return Array.prototype.filter.call(list, function (node, index, list) {
            return fn(node, index + 1, list);
        });
    };
    eq = function (a, b) {
        return a === b;
    };
    neq = function (a, b) {
        return a !== b;
    };
    gt = function (a, b) {
        return a > b;
    };
    lt = function (a, b) {
        return a < b;
    };
    gte = function (a, b) {
        return a >= b;
    };
    lte = function (a, b) {
        return a <= b;
    };
    assert = function (a, b) {
        assert.successes = [];
        assert.failures = [];
        if (a === b) {
            return assert.successes.push([
                a,
                b
            ]);
        } else {
            return assert.failures.push([
                a,
                b
            ]);
        }
    };
    assertDeep = function (a, b) {
        var len;
        len = filter(function (x, i) {
            return x === b[i - 1];
        }, a).length;
        return assert(len, b.length);
    };
    return {
        eq: eq,
        neq: neq,
        gt: gt,
        lt: lt,
        gte: gte,
        lte: lte,
        assert: assert,
        assertDeep: assertDeep
    };
}());