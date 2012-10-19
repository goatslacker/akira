memory
======

Functional language that transpiles to JavaScript.

## Syntax

### Literals

    -- String
    'i am a string'

    -- Number
    2.0
    3

    -- Boolean
    true
    false

    -- Null
    none

    -- Maps
    cat = {
      @name 'Luna'
      @age 2
    }

    -- Lists
    [1, 2, 3, 4]
    [1 2 3 4]
    ['h', 'e', 'l', 'l', 'o']

    -- Regular Expressions
    /[A-Z]+/g

### Functions

    sum = fn [a b] a + b

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
    fib = fn [n] {
      if n < 2
        then n
        else (fib: n - 1) + (fib: n - 2)
    }

    -- IIFE
    (fn [] {
      number-of-balloons = 99
    }): none

    -- Anonymous functions
    fn [x] x * x

    -- we can pass those as args
    call-function = fn [f arg] f: arg
    call-function: (fn [x] x * x), 9      -- 81

    -- There's also Pattern Matching and Guards
    fact = fn [n]
      1 ? 1
      else ? n * (fact: n - 1)

    -- splits up the list into x = head(list) and xs = tail(list)
    sort-even-odd = fn [[x, & xs]]
      not x ? []
      odd: x ? (sort-even-odd: xs) ++ [x]
      else ? x +: (sort-even-odd: xs)

      [1 2 3 4 5 6] | sort-even-odd | assert-deep: [2 4 6 5 3 1]

## License

[MIT](http://josh.mit-license.org)
