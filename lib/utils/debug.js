(function () {
function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
var eq, neq, gt, lt, gte, lte, assert, assertDeep;
this.eq = eq = function eq(a, b) {
    return a === b;
};
this.neq = neq = function neq(a, b) {
    return a !== b;
};
this.gt = gt = function gt(a, b) {
    return a > b;
};
this.lt = lt = function lt(a, b) {
    return a < b;
};
this.gte = gte = function gte(a, b) {
    return a >= b;
};
this.lte = lte = function lte(a, b) {
    return a <= b;
};
this.assert = assert = function assert(a, b) {
    if (!assert.successes) {
        (function () {
            var $$obj = {
                    successes: [],
                    failures: []
                };
            Object.keys($$obj).forEach(function (key) {
                assert[key] = $$obj[key];
            });
        }());
    } else {
        null;
    }
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
this.assertDeep = assertDeep = function assertDeep(a, b) {
    var len;
    len = filter(function (x, i) {
        return x === b[i - 1];
    }, a).length;
    return assert(len, a.length);
};
}.call(typeof module !== "undefined" ? module.exports : this))