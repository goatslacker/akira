(function () {
function foldl(fn, list) {
    return Array.prototype.reduce.call(list, fn);
}
function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
function sort(fn, list) {
    return Array.prototype.sort.call(list.slice(0), function (a, b) {
        return fn(a, b);
    });
}
var head, init, tail, last, at, get, length, join, concat, count, average, compact, intersect, max, min, nothing, randomize, unique, takeWhile, takeUntil;
this.head = head = function head($$list) {
    var $$offset = 0, x = $$list[$$offset];
    return x;
};
this.init = init = function init($$list) {
    var $$offset = 0, _ = $$list.slice(0, ($$offset = ($$list.length - 1))), x = $$list[$$offset];
    return _;
};
this.tail = tail = function tail($$list) {
    var $$offset = 0, x = $$list[$$offset], _ = $$list.slice(1, ($$offset = ($$list.length - 0)));
    return _;
};
this.last = last = function last($$list) {
    var $$offset = 0, _ = $$list.slice(0, ($$offset = ($$list.length - 1))), x = $$list[$$offset];
    return x;
};
this.at = at = function at(list, index) {
    return list[index - 1];
};
this.get = get = function get(obj, prop) {
    return obj[prop];
};
this.length = length = function length(of) {
    return of.length;
};
this.join = join = function join(list, by) {
    return list.join(by);
};
this.concat = concat = function concat() {
    return foldl(function (a, b) {
        return a.concat(b);
    }, arguments);
};
this.count = count = function count(fn, list) {
    return filter(fn, list).length;
};
this.average = average = function average(list) {
    return foldl(function (a, b) {
        return a + b;
    }, list) / list.length;
};
this.compact = compact = function compact(list) {
    return filter(function (x) {
        return !(!x);
    }, list);
};
this.intersect = intersect = function intersect(list1, list2) {
    return filter(function (x) {
        return 0 - 1 !== list2.indexOf(x);
    }, list1);
};
this.max = max = function max(list) {
    return foldl(function (a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }, list);
};
this.min = min = function min(list) {
    return foldl(function (a, b) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }, list);
};
this.nothing = nothing = function nothing(fn, list) {
    return filter(fn, list).length === 0;
};
this.randomize = randomize = function randomize(list) {
    return sort(function () {
        return Math.random() > 0.5;
    }, list);
};
this.unique = unique = function unique(list) {
    return filter(function (x, i) {
        return i === list.indexOf(x);
    }, list);
};
takeWhile = function takeWhile(fn, $$list) {
    var $$offset = 0, x = $$list[$$offset], rest = $$list[$$offset];
    switch (false) {
    case !(fn(x) === true):
        return [
            x
        ].concat(takeWhile(fn, rest));
    default:
        return [];
    }
};
this.takeWhile = takeWhile;
takeUntil = function takeUntil(fn, $$list) {
    var $$offset = 0, x = $$list[$$offset], rest = $$list[$$offset];
    switch (false) {
    case !(fn(x) === true):
        return [
            x
        ];
    default:
        return [
            x
        ].concat(takeUntil(fn, rest));
    }
};
this.takeUntil = takeUntil;
}.call(typeof module !== "undefined" ? module.exports : this))