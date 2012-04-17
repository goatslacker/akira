var Base = require('./base');

var List = function () {
  var flatten = function (list) {
    var mylist = [];
    list.forEach(function (arg) {
      if (arg instanceof List) {
        mylist = mylist.concat(flatten(arg.list));
      } else {
        mylist.push(arg);
      }
    });
    return mylist;
  };

  this.list = flatten(Array.prototype.slice.call(arguments, 0));
  return this;
};

List.prototype = Base.extend({
  compile: function (context) {
    return '[' + this.list.map(function (arg) {
      return arg.compile(context);
    }) + ']';
  },
  run: function (context) {
    var val = this.list.map(function (arg) {
      return Base.getValue(arg, context);
    });
    return val;
  }
});

module.exports = List;
