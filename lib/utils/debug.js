(function () {
var eq, neq, gt, lt, gte, lte;
this.eq = eq = function eq(a, b) {
    return a === b;
};
this.neq = neq = function neq(a, b) {
    return a !== b;
};
this.gt = gt = function gt(a, b) {
    return a > b;
};
this.lt = lt = function lt(a, b) {
    return a < b;
};
this.gte = gte = function gte(a, b) {
    return a >= b;
};
this.lte = lte = function lte(a, b) {
    return a <= b;
};
}.call(typeof module !== "undefined" ? module.exports : this))