var Runtime = {};

Runtime.env = "";

Runtime.date = function () {
  return Date.now();
};

Runtime.string = function (self) {
  this.self = self;
};

Runtime.string.prototype = {
  reverse: function () {
    var str = "";
    var i = this.self.length - 1;

    while (i >= 0) {
      str += this.self[i];
      i -= 1;
    }

    return str;
  }
};

Runtime.number = function (self) {
  this.self = self;
};

Runtime.number.prototype = {
  sum: function (x) {
    return this.self + Number(x.run());
  },
  increment: function () {
    return this.self += 1;
  }
};

module.exports = Runtime;
