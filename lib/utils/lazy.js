(function () {
var head, last, every, take, filter;
this.head = head = function (f) {
    return f(1);
};
this.last = last = function (f) {
    return function ($$list0, undefined) {
        var $$offset0 = 0, xs = $$list0.slice(0, ($$offset0 = ($$list0.length - 1))), x = $$list0[$$offset0];
        return x;
    };
};
this.every = every = function (f) {
    return f(null);
};
this.take = take = function (n, f) {
    return f(n);
};
this.filter = filter = function (f, list) {
    var iter;
    iter = function (n, i, $$list2) {
        var $$offset2 = 0, x = $$list2[$$offset2], xs = $$list2.slice(1, ($$offset2 = ($$list2.length - 0)));
        switch (false) {
        case !(!x):
            return [];
        case !(f(x) === true):
            if (i < n) {
                return [
                    x
                ].concat(iter(n, i + 1, xs));
            } else {
                return [];
            }
        default:
            return iter(n, i, xs);
        }
    };
    return function (n) {
        return iter(n || list.length, 0, list);
    };
};
}.call(typeof module !== "undefined" ? module.exports : this))