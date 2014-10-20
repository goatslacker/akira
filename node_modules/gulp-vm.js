module.exports = gulpVm

var dune = require('dune')
var fs = require('fs')
var gutil = require('gulp-util')
var path = require('path')
var through = require('through2')

var PluginError = gutil.PluginError

const PLUGIN_NAME = 'gulp-vm'

function gulpVm(f) {
  return through.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported', {
        fileName: file.path,
        showStack: false
      }))
    }

    if (file.isBuffer()) {
      var exported = dune.string(String(file.contents), file.path)
      file.contents = new Buffer(f ? f(exported) : file.contents)
    }

    this.push(file)

    return callback()
  })
}
