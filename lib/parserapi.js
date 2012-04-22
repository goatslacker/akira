exports.variables = function variables(name, value) {
  return {
    type: 'VariableDeclaration',
    kind: 'var',
    declarations: [{
      type: 'VariableDeclarator',
      id: { type: 'Identifier', name: name },
      init: value
    }]
  };
};

exports.functioncall = function functioncall(callee, args) {
  return {
    type: 'CallExpression',
    callee: callee,
    arguments: args
  };
};

exports.operation = function operation(operator, left, right) {
  return {
    type: 'BinaryExpression',
    operator: operator,
    left: left,
    right: right
  };
};

exports.ifstmt = function ifstmt(test, consequent, alternate) {
  return {
    type: 'IfStatement',
    test: test,
    consequent: consequent,
    alternate: alternate
  };
};

exports.array = function array(elements) {
  return {
    type: 'ArrayExpression',
    elements: elements
  };
};

exports.literal = function literal(value) {
  return { type: 'Literal', value: value };
};
