(function () {
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
var head, init, tail, last, at, get, length, join, concat, count, average, compact, intersect, max, min, nothing, randomize, unique, take, drop, takeWhile, takeUntil;
this.head = head = function ($$list0) {
    var $$offset0 = 0, x = $$list0[$$offset0];
    return x;
};
this.init = init = function ($$list0) {
    var $$offset0 = 0, xs = $$list0.slice(0, ($$offset0 = ($$list0.length - 1))), x = $$list0[$$offset0];
    return xs;
};
this.tail = tail = function ($$list0) {
    var $$offset0 = 0, x = $$list0[$$offset0], xs = $$list0.slice(1, ($$offset0 = ($$list0.length - 0)));
    return xs;
};
this.last = last = function ($$list0) {
    var $$offset0 = 0, xs = $$list0.slice(0, ($$offset0 = ($$list0.length - 1))), x = $$list0[$$offset0];
    return x;
};
this.at = at = function (index, list) {
    return list[index - 1];
};
this.get = get = function (obj, prop) {
    return obj[prop];
};
this.length = length = function (of) {
    return of.length;
};
this.join = join = function (by, list) {
    return list.join(by);
};
this.concat = concat = function (args) {
    args = Array.prototype.slice.call(arguments, 0)
    return foldl(function (a, b) {
        return a.concat(b);
    }, args);
};
this.count = count = function (fn, list) {
    return filter(fn, list).length;
};
this.average = average = function (list) {
    return foldl(function (a, b) {
        return a + b;
    }, list) / list.length;
};
this.compact = compact = function (list) {
    return filter(function (x) {
        return !(!x);
    }, list);
};
this.intersect = intersect = function (list1, list2) {
    return filter(function (x) {
        return 0 - 1 !== list2.indexOf(x);
    }, list1);
};
this.max = max = function (list) {
    return foldl(function (a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }, list);
};
this.min = min = function (list) {
    return foldl(function (a, b) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }, list);
};
this.nothing = nothing = function (fn, list) {
    return filter(fn, list).length === 0;
};
this.randomize = randomize = function (list) {
    return sort(function () {
        return Math.random() > 0.5;
    }, list);
};
this.unique = unique = function (list) {
    return filter(function (x, i) {
        return i - 1 === list.indexOf(x);
    }, list);
};
this.take = take = function (n, list) {
    return list.slice(0, n);
};
this.drop = drop = function (n, list) {
    return list.slice(n);
};
this.takeWhile = takeWhile = function (fn, $$list1) {
    var $$offset1 = 0, x = $$list1[$$offset1], xs = $$list1.slice(1, ($$offset1 = ($$list1.length - 0)));
    switch (false) {
    case !(fn(x) === true):
        return [
            x
        ].concat(takeWhile(fn, xs));
    default:
        return [];
    }
};
this.takeUntil = takeUntil = function (fn, $$list1) {
    var $$offset1 = 0, x = $$list1[$$offset1], xs = $$list1.slice(1, ($$offset1 = ($$list1.length - 0)));
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
}.call(typeof module !== "undefined" ? module.exports : this))