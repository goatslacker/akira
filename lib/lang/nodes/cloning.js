var Base = require('./base');
var esprima = require('esprima');
var escodegen = require('escodegen');
var vm = require('vm');
var obj2str = require('obj2str');
var CallExpression = require('ast/CallExpression');

function runMacro(name, args, context) {
  var self = {};
  var ast = Base._macros[name];

  args = esprima.parse(obj2str(args));

  ast = {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: ast,
      arguments: args.body[0].expression.elements
    }
  }

  var code = escodegen.generate(ast);
  var result;
  try {
    result = vm.runInNewContext(code, context);
  } catch (e) {
    console.error(code);
    throw e;
  }

  return result;
}


function Cloning(id, map) {
  this.id = id;
  this.map = map;
  return this;
}

Cloning.prototype.compile = function (context) {
  var map = Base.compileValue(this.map, context);

  if (map.type === 'Identifier' && Base._macros[map.name]) {
    return runMacro(map.name, Base.compileValue(this.id, context), context);
  }

  if (map.type === 'ArrayExpression' ||
    (map.type === 'Identifier' &&
      context[map.name].type === 'ArrayExpression')) {
    return CallExpression({
      type: 'MemberExpression',
      computed: false,
      object: map,
      property: {
        type: 'Identifier',
        name: 'concat'
      }
    }, Base.compileValue(this.id, context));
  }

  var id = Base.compileValue(this.id, context);

  return [map].concat(id).reduce(function (a, b) {
    if (b.type === 'ObjectExpression') {
      b.properties = b.properties.map(function (prop) {
        return {
          type: 'Property',
          key: prop.key,
          value: {
            type: 'ObjectExpression',
            properties: [{
              type: 'Property',
              key: { type: 'Identifier', name: 'value' },
              value: prop.value,
              kind: 'init'
            }]
          },
          kind: 'init'
        };
      });
    }

    return CallExpression({
      type: 'MemberExpression',
      computed: false,
      object: {
        type: 'Identifier',
        name: 'Object'
      },
      property: {
        type: 'Identifier',
        name: 'create'
      }
    }, [
      CallExpression({
        type: 'Identifier',
        name: 'Object'
      }, [a]),
      b
    ]);
  });
};

module.exports = Cloning;
