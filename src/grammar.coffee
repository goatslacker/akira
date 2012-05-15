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
    action = action.replace(/\b(?:Nodes\.wrap)\b/g, 'yy.$&')
    [patternString, "$$ = " + action + "", options]

  tokens = ["ASSERT", "LAMBDA", "BOOL",
            "COMPARE", "DEFAULT",
            "IDENTIFIER", "LOGIC",
            "NUMBER", "STRING",
            "TERMINATOR",].join(" ")

  startSymbol = 'Root'

  bnf = {
    Root: [
      ['', 'return $$ = new yy.Nodes;']
      ['Program', 'return $$ = $1']
    ]

    Program: [
      o 'Terminator Expressions', -> $2
      o 'Expressions'
    ]

    Expressions: [
      o 'Body', -> Nodes.wrap $1
      o 'Expressions TERMINATOR Body', -> $1.push $3
      o 'Expressions TERMINATOR'
    ]

    Terminator: [
      o 'TERMINATOR'
      o 'Terminator TERMINATOR'
    ]

    Identifier: [ o 'IDENTIFIER' ]

    Body: [
      o 'Expression'
      o '( Expressions )', -> $2
      o '( Terminator Expressions )', -> $3
    ]

    SExpression: [
      o '( Expression )', -> $2
    ]

    Expression: [
      o 'Modules'
      o 'Value'
      o 'If'
      o 'Assignment'
      o 'ARGUMENTS'
      o 'Invocation'
      o 'Pipeline'
      o 'Declaration'
    ]

    Value: [
      o 'Literal'
      o 'Lists'
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
      o 'Identifier = Body', -> new Assignment $1, $3
    ]

    Modules: [
      o 'EXPORT Identifier', -> new Export $2
      o 'IMPORT STRING', -> new Import $2
    ]

    Piped: [
      o 'Identifier'
      o 'SExpression'
    ]

    Pipeline: [
      o 'Invocation | Piped', -> new Call $3, $1
      o 'Identifier | Piped', -> new Call $3, $1
      o 'List | Piped', -> new Call $3, $1

      o 'Pipeline | Piped', -> new Call $3, $1
    ]

    Invocation: [
      o 'Identifier : Arguments', -> new Call $1, $3
    ]

    Declaration: [
      o 'Identifier ( Parameters ) LAMBDA Body', -> new Declaration $1, $3, $6
      o '\\ Parameters LAMBDA Body', -> new Declaration null, $2, $4

      o 'LAMBDA Body', -> new Call (new Declaration null, null, $2), null
    ]

    Lists: [
      o '[ Arguments ]', -> new List $2
    ]

    Arg: [
      o 'Value'
      o 'SExpression'
      o 'ARGUMENTS'
    ]

    Arguments: [
      o '( )', -> null
      o 'Arg', -> new Arguments $1
      o 'Arguments , Arg', -> new Arguments $1, $3
    ]

    Param: [
      o 'Identifier'
    ]

    Parameters: [
      o '', -> null
      o 'Param', -> new Arguments $1
      o 'Parameters , Param', -> new Arguments $1, $3
    ]

    If: [
      o 'IF Value THEN Body ELSE Body', -> new If $2, $4, $6
      o 'IF Value Terminator THEN Body Terminator ELSE Body', -> new If $2, $5, $8
    ]

    Operation: [
      o 'Value COMPARE Value', -> new Compare $1, $2, $3
      o 'Value LOGIC Value', -> new Compare $1, $2, $3
      o 'Value + Value', -> new Operation $1, '+', $3
      o 'Value - Value', -> new Operation $1, '-', $3
      o 'Value * Value', -> new Operation $1, '*', $3
      o 'Value / Value', -> new Operation $1, '/', $3
    ]
  }

  operators = [
    ['right', '=', '|', '[', ']']
    ['nonassoc', '(', ')', 'LAMBDA']
    ['left', 'LOGIC']
    ['left', 'COMPARE']
    ['left', '+', '-']
    ['left', '*', '/']
  ]

  { tokens, bnf, operators, startSymbol }
)()

# write to file
fs.writeFileSync './lib/parser.js', parser.generate(), 'utf8'
