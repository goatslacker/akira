function Literal(lit) {
  this.literal = lit;
  return this;
}

function literalize(x) {
  if (typeof x !== 'string') {
    return x;
  }

  var rx = /{{(.*)}}/;

  if (rx.test(x)) {
    return { type: 'Identifier', name: '(' + rx.exec(x)[1] + ')' };
  }

  return { type: 'Literal', value: x };
}

function concat_str(l, r) {
  l = literalize(l);
  r = literalize(r);
  return {
    type: 'BinaryExpression',
    operator: '+',
    left: l,
    right: r
  };
}

Literal.prototype.compile = function (context) {
  var interpol;
  switch (typeof this.literal) {
    case 'string':
      interpol = this.literal.split(/({{[A-Za-z0-9$ \+\-\*\/_\.\[\]]+}})/g);
      if (interpol.length > 1) {
        return interpol.reduce(function (a, b) {
          return concat_str(a, b);
        });
      }
      break;
    case 'number':
      if (this.literal < 0) {
        return {
          type: 'UnaryExpression',
          operator: '-',
          argument: {
            type: 'Literal',
            value: Math.abs(this.literal)
          }
        };
      }
      break;
  }

  return { type: 'Literal', value: this.literal };
};

module.exports = Literal;
