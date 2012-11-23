function VariableDeclaration(declarations) {
  return {
    type: 'VariableDeclaration',
    declarations: declarations.map(function (declaration) {
      return {
        type: 'VariableDeclarator',
        id: declaration,
        init: null
      }
    }),
    kind: 'var'
  }
}

module.exports = VariableDeclaration;
