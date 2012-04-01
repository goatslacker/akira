fs = require 'fs'
{ Parser } = require 'jison'

parser = new Parser (->
  unwrap = /^function\s*\(\)\s*\{\s*return\s*([\s\S]*)\s*\}/

  o = (patternString, action, options) ->
    patternString = patternString.replace(/\s{2,}/g, ' ')
    return [patternString, '$$ = $1', options] if not action
    match = unwrap.exec action
    action = if match then match[1] else "(#{action}())"
    action = action.replace(/\bnew /g, '$&yy.')
    action = action.replace(/\b(?:Nodes\.add)\b/g, 'yy.$&')
    [patternString, "$$ = " + action + "", options]

  tokens = ["ASSERT", "LAMBDA", "BOOL", "CASE",
            "COMPARE", "DEFAULT", "ELSE", "FN",
            "IDENTIFIER", "IF", "LOGIC",
            "NUMBER", "PRINT", "RETURN", "STRING",
            "TERMINATOR", "WHILE"].join(" ")

  startSymbol = 'Root'

  bnf = {
    Root: [
      ['Expressions', 'return $$ = $1']
    ]

    Expressions: [
      o 'Expression', -> new Nodes $1
      o 'Expressions TERMINATOR Expression', -> $1.push $3
      o 'Expressions TERMINATOR', -> new Nodes $1
    ]

    Terminator: [
      o 'TERMINATOR'
      o 'Terminator TERMINATOR'
    ]

    Identifier: [ o 'IDENTIFIER' ]

    Expression: [
      o 'Literal'
      o 'Invocation'
      o 'Assignment'
      o 'Declaration'
      o 'Operation'
    ]

    Literal: [
      o 'Identifier'
      o 'AlphaNumeric'
      o 'BOOL'
    ]

    AlphaNumeric: [
      o 'NUMBER', -> new Literal Number $1
      o 'STRING', -> new Literal String $1
    ]

    Assignment: [
      o 'Identifier = Expression', -> new Assignment $1, $3
    ]

    Invocation: [
      o 'Identifier ( Arguments )', -> new Call $1, $3
      o 'PRINT ( Arguments )', -> new Call 'print', $3
    ]

    Declaration: [
      o 'Identifier LAMBDA Parameters : Expression', -> new Declaration $1, $3, $5
      o 'Identifier LAMBDA Parameters Block', -> new Declaration $1, $3, $4
    ]

    Arguments: [
      o '', -> null
      o 'Expression', -> new Arguments $1
      o 'Arguments , Expression', -> new Arguments $1, $3
    ]

    Parameters: [
      o '', -> null
      o 'Identifier', -> new Arguments $1
      o 'Parameters , Identifier', -> new Arguments $1, $3
      o '( Parameters )', -> new Arguments $2
    ]

    Operation: [
      o 'Expression COMPARE Expression', -> new Compare $1, $2, $3
      o 'Expression LOGIC Expression', -> new Compare $1, $2, $3
      o 'Expression + Expression', -> new Operation $1, '+', $3
      o 'Expression - Expression', -> new Operation $1, '-', $3
      o 'Expression * Expression', -> new Operation $1, '*', $3
      o 'Expression / Expression', -> new Operation $1, '/', $3
      o '( Expression )', -> $2
    ]

    Block: [
      o '{ }', -> null
      o '{ Expressions }', -> $2
      o '{ Terminator Expressions }', -> $3
    ]

  }

  operators = [
    ['right', '=', ':', 'PRINT']
    ['nonassoc', '{', '}']
    ['left', 'LOGIC']
    ['left', 'COMPARE']
    ['left', '+', '-']
    ['left', '*', '/']
    ['left', '.']
  ]

  { tokens, bnf, operators, startSymbol }
)()

# write to file
fs.writeFileSync './lib/parser.js', parser.generate(), 'utf8'
