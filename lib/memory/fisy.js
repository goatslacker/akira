module.exports = (function ($$export) {
    var map = function map(fn, list) {
        return Array.prototype.map.call(list, function (node, index, list) {
            return fn(node, index + 1, list);
        });
    };
    var show = function (i) {
        return i.toString();
    };
    var fs, path, walk, getFileContents, getFiles, writeFile;
    fs = require('fs');
    path = require('path');
    walk = function (cb, tree) {
        var stat;
        try {
            stat = fs.statSync(tree);
        } catch (err) {
            throw new Error(err);
        }
        if (stat.isDirectory()) {
            return map(function (v) {
                return walk(cb, path.join(tree, v));
            }, fs.readdirSync(tree));
        } else {
            if (tree.indexOf('.mem') >= 0) {
                return getFileContents(cb, tree);
            } else {
                return null;
            }
        }
    };
    getFileContents = function (cb, filepath) {
        return cb(filepath, show(fs.readFileSync(path.join(process.env.PWD, filepath))));
    };
    getFiles = function (cb, dirname) {
        var stat;
        stat = fs.statSync(dirname);
        if (stat.isDirectory()) {
            return walk(cb, dirname);
        } else {
            return getFileContents(cb, dirname);
        }
    };
    writeFile = function (file, code) {
        return fs.writeFileSync(path.join(process.env.PWD, function (fname) {
            return fname.replace('.mem', '.js');
        }(file.replace('src', 'lib'))), code);
    };
    return {
        getFiles: getFiles,
        writeFile: writeFile
    };
}());