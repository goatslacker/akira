(function () {
function foldl(fn, list) {
    return Array.prototype.reduce.call(list, fn);
}
function filter(fn, list) {
    return Array.prototype.filter.call(list, function (node, index, list) {
        return fn(node, index + 1, list);
    });
}
var head, init, tail, last, at, get, length, join, concat, count;
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
}.call(typeof module !== "undefined" ? module.exports : this))