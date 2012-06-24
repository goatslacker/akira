exports.lexer = {
  lex: function () {
    var ref;
    this.pos = this.pos + 1;
    ref = this.tokens[this.pos] || [''];
    this.yytext = ref[1];
    this.yylineno = ref[2];
    return ref[0];
  },
  setInput: function (tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }
};
