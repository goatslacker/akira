(function () {
function div() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
        return a / b;
    });
}
function foldl(fn, list) {
    return Array.prototype.reduce.call(list, fn);
}
function sum() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
        return a + b;
    });
}
function length(list) {
    return list.length;
}
function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
function neq(a, b) {
    return a !== b;
}
function eq(a, b) {
    return a === b;
}
function sort(fn, list) {
    return Array.prototype.sort.call(list, function (a, b) {
        return fn(a, b);
    });
}
function gt(a, b) {
    return a > b;
}
var average, compact, count, intersect, max, min, none, randomize, unique;
this.average = function average(list) {
    return div(foldl(sum, list), length(list));
};
this.compact = function compact(list) {
    return filter(function (x) {
        return neq(neq(x));
    }, list);
};
this.count = function count(fn, list) {
    return length(filter(fn, list));
};
this.intersect = function intersect(list1, list2) {
    return filter(function (x) {
        return neq(0 - 1, list2.indexOf(x));
    }, list1);
};
this.max = function max(list) {
    return foldl(function (a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }, list);
};
this.min = function min(list) {
    return foldl(function (a, b) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }, list);
};
this.none = function none(fn, list) {
    return eq(length(filter(fn, list)), 0);
};
this.randomize = function randomize(list) {
    return sort(function () {
        return gt(Math.random(), 0.5);
    }, list);
};
this.unique = function unique(list) {
    return filter(function (x, i) {
        return eq(i, list.indexOf(x));
    }, list);
};
}.call(typeof module !== "undefined" ? module.exports : this))
