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
