memory
======

A very impractical but fun language which compiles to JavaScript.

Inspired by Functional Programming.

## Syntax

### Literals

    -- string
    'i am a string'

    -- number
    2.0
    3

    -- boolean
    true
    false

    -- null
    none

    -- Objects
    cat = #{
      name =: 'Luna'
      age =: 2
    }

    -- Lists
    [1, 2, 3, 4]
    ['h', 'e', 'l', 'l', 'o']

### Functions

    sum = \a, b -> a + b

    -- invoking sum...
    sum: 1, 2

    -- functions can also be invoked with pipes
    sum: 1, 2 | print        -- print(sum(1, 2))

    -- multiple expressions can be piped together
    1 | id | print           -- print(id(1))

    -- previous args are carried over into function calls
    -- also have some sugar functions such for operations like comparisons.
    1 | sum: 2 | (== 3)   -- sum(2, 1) == 3

    -- function expressions with a body
    fib = \n {
      if n < 2
        then n
        else (fib: n - 1) + (fib: n - 2)
    }

    -- IIFE
    (\-> {
      number-of-balloons = 99
    }): none

    -- Anonymous functions
    \x -> x * x

    -- we can pass those as args
    call-function = \fn, arg -> fn: arg
    call-function: (\x -> x * x), 9      -- 81

    -- There's also Pattern Matching and Guards
    fact = \n ->
      1 ? 1
      n ? n * (fact: n - 1)

    -- splits up the list into x = head(list) and rest = tail(list)
    sort-even-odd = \[x, rest] ->
      rest.length is 0 ? [x]
      otherwise ? if (odd: x) then (sort-even-odd: rest) ++ [x] else x +: (sort-even-odd: rest)

    -- More guards in action
    starts-with = \noun, prefix -> prefix == noun.1 + noun.2

    spanish-gender-of-noun = \noun ->
      (starts-with: noun, 'el') ? 'male'
      (starts-with: noun, 'la') ? 'female'


## License

[MIT](http://josh.mit-license.org)
