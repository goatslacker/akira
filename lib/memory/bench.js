module.exports = (function ($$export) {
    var util, mark;
    util = require('util');
    mark = function (fn) {
        var start, result, end, time;
        start = Date.now();
        result = fn();
        end = Date.now();
        time = end - start;
        return {
            time: time,
            result: result
        };
    };
    return {
        mark: mark
    };
}());