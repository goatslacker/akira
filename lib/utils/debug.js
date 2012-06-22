(function () {
var filter = function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
};
var eq, neq, gt, lt, gte, lte, assert, assertDeep;
this.eq = eq = function (a, b) {
    return a === b;
};
this.neq = neq = function (a, b) {
    return a !== b;
};
this.gt = gt = function (a, b) {
    return a > b;
};
this.lt = lt = function (a, b) {
    return a < b;
};
this.gte = gte = function (a, b) {
    return a >= b;
};
this.lte = lte = function (a, b) {
    return a <= b;
};
this.assert = assert = function (a, b) {
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
this.assertDeep = assertDeep = function (a, b) {
    var len;
    len = filter(function (x, i) {
        return x === b[i - 1];
    }, a).length;
    return assert(len, b.length);
};
}.call(typeof module !== "undefined" ? module.exports : this))