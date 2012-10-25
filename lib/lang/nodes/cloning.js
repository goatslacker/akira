var Base = require('./base');

function Cloning(id, map) {
  this.id = id;
  this.map = map;
  return this;
}

Cloning.prototype.compile = function (context) {
  var map = Base.compileValue(this.map, context);

  if (map.type === 'ArrayExpression') {
    return {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: map,
        property: {
          type: 'Identifier',
          name: 'concat'
        }
      },
      arguments: [Base.compileValue(this.id, context)]
    }
  }

  map.properties = map.properties.map(function (prop) {
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

  return {
    type: 'CallExpression',
    callee: {
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
    },
    arguments: [{
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: 'Object'
      },
      arguments: [Base.compileValue(this.id, context)]
    }, map]
  };
};

module.exports = Cloning;
