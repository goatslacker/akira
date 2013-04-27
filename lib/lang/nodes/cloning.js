var CallExpression = require('ast/CallExpression');
var ExpressionStatement = require('ast/ExpressionStatement')
var Identifier = require('ast/Identifier');
var MemberExpression = require('ast/MemberExpression');
var Store = require('Store');
var ast = require('ast');
var escodegen = require('escodegen');
var esprima = require('esprima');
var obj2str = require('obj2str');
var vm = require('vm');

function runMacro(name, args, context) {
  var self = {};
  var ast = Store.macros[name];

  args = esprima.parse(obj2str(args));

  ast = ExpressionStatement(
    CallExpression(ast, args.body[0].expression.elements)
  ).pop()

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
  var map = ast(this.map, context);

  if (map.type === 'Identifier' && Store.macros[map.name]) {
    return runMacro(map.name, ast(this.id, context), context);
  }

  if (map.type === 'ArrayExpression' ||
    (map.type === 'Identifier' &&
      context[map.name] &&
      context[map.name].type === 'ArrayExpression')) {
    return CallExpression(
      MemberExpression(map, Identifier('concat')),
      ast(this.id, context)
    );
  }

  var id = ast(this.id, context);

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
              key: Identifier('value'),
              value: prop.value,
              kind: 'init'
            }]
          },
          kind: 'init'
        };
      });
    }

    return CallExpression(
      MemberExpression(
        Identifier('Object'),
        Identifier('create')
      ),
      [CallExpression(Identifier('Object'), [a]), b]
    );
  });
};

module.exports = Cloning;
