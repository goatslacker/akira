(function () {
var consts, id, flip;
this.consts = consts = function consts(a) {
    return a;
};
this.id = id = function id(a) {
    return a;
};
this.flip = flip = function flip(f, a, b) {
    return f(b, a);
};
}.call(typeof module !== "undefined" ? module.exports : this))