const Base = require('./base');

var If = function (condition, block, elsif) {
  if (elsif) {
    this.theif = condition;
    this.elsif = elsif;
  } else {
    this.block = block;
    this.condition = condition;
  }
  return this;
};

If.prototype = Base.extend({
  run: function (context) {
    if (this.elsif) {
      var isTrue = Base.getValue(this.theif.condition, context);
//console.log('did condition return true? ' + isTrue);
      if (isTrue === true) {
//console.log('it is true --- lets run the block');
//console.log(this.theif.block);
        var result = this.theif.block.run(context);
        return result;
      } else {
//console.log('guess we run the else block');
//console.log(this.elsif);
        return this.elsif.run(context);
      }
    } else {
      var isTrue = Base.getValue(this.condition, context);
      if (isTrue === true) {
        var result = this.block.run(context);
        return result;
      }
    }
  }
});

module.exports = If;
