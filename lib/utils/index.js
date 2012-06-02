var modules = {};
var path = require('path');

function include(mod) {
  var fns = require(path.join(__dirname, mod));
  Object.keys(fns).forEach(function (key) {
    modules[key] = fns[key];
  });
}

include('enumerable');
include('functions');
include('math');
include('debug');

module.exports = modules;
