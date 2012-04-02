var Runtime = {};

Runtime.env = "";

Runtime.date = function () {
  return Date.now();
};

Runtime.print = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  console.log(args);
};

module.exports = Runtime;
