module.exports = (function ($$export) {
    var head, init, tail, last, at, get, length, join, concat, count, average, compact, intersect, max, min, nothing, randomize, unique, take, drop, takeWhile, takeUntil;
    var foldl = function foldl(fn, list) {
        return Array.prototype.reduce.call(list, fn);
    };
    var filter = function filter(fn, list) {
        return Array.prototype.filter.call(list, function (node, index, list) {
            return fn(node, index + 1, list);
        });
    };
    var sort = function sort(fn, list) {
        return Array.prototype.sort.call(list.slice(0), function (a, b) {
            return fn(a, b);
        });
    };
    head = function ($$list0) {
        var $$offset0 = 0, x = $$list0[$$offset0++];
        return x;
    };
    init = function ($$list0) {
        var $$offset0 = 0, xs = $$list0.slice(0, ($$offset0 = ($$list0.length - 1))), x = $$list0[$$offset0++];
        return xs;
    };
    tail = function ($$list0) {
        var $$offset0 = 0, x = $$list0[$$offset0++], xs = $$list0.slice(1, ($$offset0 = ($$list0.length - 0)));
        return xs;
    };
    last = function ($$list0) {
        var $$offset0 = 0, xs = $$list0.slice(0, ($$offset0 = ($$list0.length - 1))), x = $$list0[$$offset0++];
        return x;
    };
    at = function (index, list) {
        return list[index - 1];
    };
    get = function (obj, prop) {
        return obj[prop];
    };
    length = function (of) {
        return of.length;
    };
    join = function (by, list) {
        return list.join(by);
    };
    concat = function (args) {
        args = Array.prototype.slice.call(arguments, 0)
        return foldl(function (a, b) {
            return a.concat(b);
        }, args);
    };
    count = function (fn, list) {
        return filter(fn, list).length;
    };
    average = function (list) {
        return foldl(function (a, b) {
            return a + b;
        }, list) / list.length;
    };
    compact = function (list) {
        return filter(function (x) {
            return !(!x);
        }, list);
    };
    intersect = function (list1, list2) {
        return filter(function (x) {
            return list2.indexOf(x) !== 0 - 1;
        }, list1);
    };
    max = function (list) {
        return foldl(function (a, b) {
            if (a > b) {
                return a;
            } else {
                return b;
            }
        }, list);
    };
    min = function (list) {
        return foldl(function (a, b) {
            if (a < b) {
                return a;
            } else {
                return b;
            }
        }, list);
    };
    nothing = function (fn, list) {
        return filter(fn, list).length === 0;
    };
    randomize = function (list) {
        return sort(function () {
            return Math.random() > 0.5;
        }, list);
    };
    unique = function (list) {
        return filter(function (x, i) {
            return list.indexOf(x) === i - 1;
        }, list);
    };
    take = function (n, list) {
        return list.slice(0, n);
    };
    drop = function (n, list) {
        return list.slice(n);
    };
    takeWhile = function (fn, $$list1) {
        var $$offset1 = 0, x = $$list1[$$offset1++], xs = $$list1.slice(1, ($$offset1 = ($$list1.length - 0)));
        switch (false) {
        case !(fn(x) === true):
            return [
                x
            ].concat(takeWhile(fn, xs));
        default:
            return [];
        }
    };
    takeUntil = function (fn, $$list1) {
        var $$offset1 = 0, x = $$list1[$$offset1++], xs = $$list1.slice(1, ($$offset1 = ($$list1.length - 0)));
        switch (false) {
        case !(fn(x) === true):
            return [
                x
            ];
        default:
            return [
                x
            ].concat(takeUntil(fn, xs));
        }
    };
    return {
        head: head,
        init: init,
        tail: tail,
        last: last,
        at: at,
        get: get,
        length: length,
        join: join,
        concat: concat,
        count: count,
        average: average,
        compact: compact,
        intersect: intersect,
        max: max,
        min: min,
        nothing: nothing,
        randomize: randomize,
        unique: unique,
        take: take,
        drop: drop,
        takeWhile: takeWhile,
        takeUntil: takeUntil
    };
}());