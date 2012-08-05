module.exports = (function ($$export) {
    var nodewatch, getFileContents, watch;
    nodewatch = require('nodewatch');
    {
        var $$ref;
        $$ref = require('./fisy');
        getFileContents = $$ref.getFileContents;
    }
    watch = function (filename) {
        return function (f) {
            return f.onChange(function () {
                return function (data) {
                    return write(data, filename);
                }(compile(getFileContents(filename)));
            });
        }(nodewatch.add(filename));
    };
    return watch;
}());