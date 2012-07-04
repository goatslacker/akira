var $$MEMORY = (typeof module !== "undefined") ? module : {};
$$MEMORY.exports = (function ($$export) {
    var apply, consts, id, flip, partial, partialr, curry, curryr, show;
    apply = function (f, args) {
        args = Array.prototype.slice.call(arguments, 1)
        return f.apply(f, args);
    };
    consts = function (a) {
        return a;
    };
    id = function (a) {
        return a;
    };
    flip = function (f, a, b) {
        return f(b, a);
    };
    partial = function (f, args) {
        args = Array.prototype.slice.call(arguments, 1)
        return function (xargs) {
            xargs = Array.prototype.slice.call(arguments, 0)
            return f.apply(f, args.concat(xargs));
        };
    };
    partialr = function (f, args) {
        args = Array.prototype.slice.call(arguments, 1)
        return function (xargs) {
            xargs = Array.prototype.slice.call(arguments, 0)
            return f.apply(f, xargs.concat(args));
        };
    };
    curry = function (fn) {
        var c;
        c = function (args) {
            if (args == null)
                args = [];
            return function (arg) {
                var xargs;
                xargs = args.concat(arg);
                if (xargs.length < fn.length) {
                    return c(xargs);
                } else {
                    return fn.apply(fn, xargs);
                }
            };
        };
        if (fn.length < 1) {
            return fn;
        } else {
            return c(null);
        }
    };
    curryr = function (fn) {
        var c;
        c = function (args) {
            if (args == null)
                args = [];
            return function (arg) {
                var xargs;
                xargs = [
                    arg
                ].concat(args);
                if (xargs.length < fn.length) {
                    return c(xargs);
                } else {
                    return fn.apply(fn, xargs);
                }
            };
        };
        if (fn.length < 1) {
            return fn;
        } else {
            return c(null);
        }
    };
    show = function (i) {
        return i.toString();
    };
    return {
        apply: apply,
        consts: consts,
        id: id,
        flip: flip,
        partial: partial,
        partialr: partialr,
        curry: curry,
        curryr: curryr,
        show: show
    };
}());