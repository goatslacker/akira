module.exports = (function ($$export) {
    var nodewatch, getFileContents, watch;
    nodewatch = require('nodewatch');
    {
        var $$ref;
        $$ref = require('./fisy');
        getFileContents = $$ref.getFileContents;
    }
    watch = function (filename) {
        return nodewatch.add(filename).onChange(function () {
            return write(compile(getFileContents(filename)), filename);
        });
    };
    return watch;
}());