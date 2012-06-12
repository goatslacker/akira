(function () {
var consts, id, flip;
this.consts = consts = function (a) {
    return a;
};
this.id = id = function (a) {
    return a;
};
this.flip = flip = function (f, a, b) {
    return f(b, a);
};
}.call(typeof module !== "undefined" ? module.exports : this))