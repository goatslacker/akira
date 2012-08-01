module.exports = (function ($$export) {
    var Base;
    Base = require('./base');
    {
        function Map($$props) {
            var self = this;
            Object.keys($$props || {}).forEach(function (prop) {
                self[prop] = $$props[prop];
            });
        }
        Map.prototype.init = function (obj) {
            return this.obj = obj;
        };
        Map.prototype.compile = function (context) {
            var properties;
            if (this.obj) {
                properties = this.obj.args.map(function (arg) {
                    var key, value;
                    key = Base.compileValue(arg.id, context);
                    value = Base.compileValue(arg.val, context);
                    return {
                        type: 'Property',
                        key: key,
                        value: value
                    };
                });
            } else {
                properties = [];
            }
            return {
                type: 'ObjectExpression',
                properties: properties
            };
        };
    }
    return Map;
}());