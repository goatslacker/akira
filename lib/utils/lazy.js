(function () {
var head, take, filter;
head = function (it) {
    return it();
};
take = function (n, it) {
    return function () {
        var $$res = [], $$fn = function () {
                return it();
            };
        for (var i = 1; i <= n; i += 1) {
            $$res.push($$fn(i));
        }
        return $$res;
    }();
};
filter = function (f, $$list1) {
    var self;
    var $$offset1 = 0, list = $$list1.slice(0, ($$offset1 = ($$list1.length - 0)));
    return self = function () {
        var item;
        item = list.shift();
        if (!item) {
            return [];
        } else {
            if (f(item) === true) {
                return item;
            } else {
                return self(null);
            }
        }
    };
};
var a = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
var f = filter(function (x) {
  return x.toString()[0] === '2'
}, a);

console.log(head(f));
console.log(take(5, f));
}.call(typeof module !== "undefined" ? module.exports : this))
