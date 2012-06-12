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
var head, init, tail, last, at, get, length, join, concat, count, average, compact, intersect, max, min, nothing, randomize, unique, takeWhile, takeUntil;
this.head = head = function ($$list) {
    var $$offset = 0, x = $$list[$$offset];
    return x;
};
this.init = init = function ($$list) {
    var $$offset = 0, _ = $$list.slice(0, ($$offset = ($$list.length - 1))), x = $$list[$$offset];
    return _;
};
this.tail = tail = function ($$list) {
    var $$offset = 0, x = $$list[$$offset], _ = $$list.slice(1, ($$offset = ($$list.length - 0)));
    return _;
};
this.last = last = function ($$list) {
    var $$offset = 0, _ = $$list.slice(0, ($$offset = ($$list.length - 1))), x = $$list[$$offset];
    return x;
};
this.at = at = function (list, index) {
    return list[index - 1];
};
this.get = get = function (obj, prop) {
    return obj[prop];
};
this.length = length = function (of) {
    return of.length;
};
this.join = join = function (list, by) {
    return list.join(by);
};
this.concat = concat = function () {
    return foldl(function (a, b) {
        return a.concat(b);
    }, arguments);
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
        return i === list.indexOf(x);
    }, list);
};
takeWhile = function (fn, $$list) {
    var $$offset = 0, x = $$list[$$offset], _ = $$list.slice(1, ($$offset = ($$list.length - 0)));
    switch (false) {
    case !(fn(x) === true):
        return [
            x
        ].concat(takeWhile(fn, _));
    default:
        return [];
    }
};
this.takeWhile = takeWhile;
takeUntil = function (fn, $$list) {
    var $$offset = 0, x = $$list[$$offset], _ = $$list.slice(1, ($$offset = ($$list.length - 0)));
    switch (false) {
    case !(fn(x) === true):
        return [
            x
        ];
    default:
        return [
            x
        ].concat(takeUntil(fn, _));
    }
};
this.takeUntil = takeUntil;
}.call(typeof module !== "undefined" ? module.exports : this))