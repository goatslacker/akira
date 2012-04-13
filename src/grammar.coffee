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

  tokens = ["ASSERT", "LAMBDA", "BOOL",
            "COMPARE", "DEFAULT",
            "IDENTIFIER", "LOGIC",
            "NUMBER", "STRING",
            "TERMINATOR",].join(" ")

  startSymbol = 'Root'

  bnf = {
    Root: [
      ['Expressions', 'return $$ = $1']
    ]

    Expressions: [
      o 'Body', -> new Nodes $1
      o 'Expressions TERMINATOR Body', -> $1.push $3
      o 'Expressions TERMINATOR', -> new Nodes $1
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

    Expression: [
      o 'Import'
      o 'Value'
      o 'Assignment'
      o 'Invocation'
      o 'Pipeline'
      o 'Lists'
      o 'Declaration'
      o '_ Identifier', -> "_#{$2}"
    ]

    Value: [
      o 'Literal'
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

    Import: [
      o '@ STRING', -> new Import $2
    ]

    Pipeline: [
      o 'Invocation | Identifier', -> new Call $3, $1

      o 'Lists | Identifier', -> new Call $3, $1

      o 'Pipeline | Identifier', -> new Call $3, $1
    ]

    Invocation: [
      o 'Identifier : Arguments', -> new Call $1, $3
    ]

    Declaration: [
      o 'Identifier ( Parameters ) LAMBDA Body', -> new Declaration $1, $3, $6
      o 'Identifier LAMBDA Body', -> new Declaration $1, null, $3
    ]

    Lists: [
      o '[ Arguments ]', -> new List $2
    ]

    Arguments: [
      o '( )', -> null
      o 'Value', -> new Arguments $1
      o 'Arguments , Value', -> new Arguments $1, $3
    ]

    Param: [
      o 'Identifier'
      o '_ Identifier', -> "_#{$2}"
    ]

    Parameters: [
      o '', -> null
      o 'Param', -> new Arguments $1
      o 'Parameters , Param', -> new Arguments $1, $3
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
