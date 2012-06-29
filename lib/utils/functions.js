(function () {
var apply, consts, id, flip, partial, partialr, curry, curryr;
this.apply = apply = function (f, args) {
    args = Array.prototype.slice.call(arguments, 1)
    return f.apply(f, args);
};
this.consts = consts = function (a) {
    return a;
};
this.id = id = function (a) {
    return a;
};
this.flip = flip = function (f, a, b) {
    return f(b, a);
};
this.partial = partial = function (f, args) {
    args = Array.prototype.slice.call(arguments, 1)
    return function (xargs) {
        xargs = Array.prototype.slice.call(arguments, 0)
        return f.apply(f, args.concat(xargs));
    };
};
this.partialr = partialr = function (f, args) {
    args = Array.prototype.slice.call(arguments, 1)
    return function (xargs) {
        xargs = Array.prototype.slice.call(arguments, 0)
        return f.apply(f, xargs.concat(args));
    };
};
this.curry = curry = function (fn, args) {
    switch (false) {
    case !(fn.length < 1):
        return fn;
    default:
        return function (arg) {
            var xargs;
            xargs = (args || []).concat([
                arg
            ]);
            if (xargs.length < fn.length) {
                return curry(fn, xargs);
            } else {
                return fn.apply(fn, xargs);
            }
        };
    }
};
this.curryr = curryr = function (fn, args) {
    switch (false) {
    case !(fn.length < 1):
        return fn;
    default:
        return function (arg) {
            var xargs;
            xargs = [
                arg
            ].concat(args || []);
            if (xargs.length < fn.length) {
                return curryr(fn, xargs);
            } else {
                return fn.apply(fn, xargs);
            }
        };
    }
};
}.call(typeof module !== "undefined" ? module.exports : this))