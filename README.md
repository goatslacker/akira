akira
======

Functional language that transpiles to JavaScript.

## Syntax

### Literals

    -- String
    'i am a string'

    -- Number
    42
    2.0
    9,000
    -3

    -- Boolean
    true
    false

    -- Maps
    cat = {
      @name 'Luna'
      @age 2
    }

    -- Vectors
    [1, 2, 3, 4]
    [1 2 3 4]
    [true false]

    -- Regular Expressions
    /[A-Z]+/g

### Operators

    -- standard math
    1 + 2
    4 - 1
    3 * 1
    9 / 3

    -- exponents
    3 ** 3      -- Math.pow(3, 3)

    -- equality
    true == true
    false != true
    3 > 2
    2 < 3
    3 >= 3
    3 <= 3

    -- logical
    false || true
    true && true

    -- concat and cons
    [1] ++ [2]          -- [1].concat(2)
    'hello ' ++ 'world' -- 'hello'.concat('world')
    1 +: [2 3]          -- [1].concat(2, 3)

    -- access
    { @key 'value' } !! 'key'  -- { key: 'value' }['key']
    { @key 'value' }.key       -- { key: 'value' }.key
    [1 2 3 4] !! 2             -- [1, 2, 3, 4][2]
    [1 2 3].1                  -- [1, 2, 3][0]

### Functions

    sum = fn [a b] {
      a + b
    }
    sub = fn [a b] {
      a - b
    }

    -- invoking sum...
    sum: 1 2

    -- invoking functions with no args
    'hello-world'.to-string!

    -- IIFE
    fn [] {
      number-of-balloons = 99
    }!

    -- Anonymous functions
    fn [x] x * x

### Pipes

    -- functions can also be invoked with pipes
    sum: 1 2 | print        -- print(sum(1, 2))

    -- multiple expressions can be piped together
    1 | id | print           -- print(id(1))

    -- previous args are carried over into function calls
    -- also have some sugar functions such for operations like comparisons.
    1 | sum: 2 | (== 3)   -- sum(2, 1) === 3

    -- or you can use `underscore` to place your arg
    2 | sub: _ 1 | (== 1)    -- sub(2, 1) === 1


### Conditionals

    n = 4
    is-n-four = if n == 4
      then true
      else false

    cond
      n == 4 ? n
      n == 2 ? n + 2
      else ? 0

### Pattern Matching

    -- There's also Pattern Matching and Guards
    fact = match {
      [1] 1
      [n] n * (fact: n - 1)
    }

    -- splits up the list into x = head(list) and xs = tail(list)
    sort-even-odd = fn [[x, & xs]] {
      cond
        not x ? []
        odd: x ? (sort-even-odd: xs) ++ [x]
        else ? x +: (sort-even-odd: xs)
    }

    [1 2 3 4 5 6] | sort-even-odd | assert-deep: [2 4 6 5 3 1]


### Exceptions

    try {
      some-function-that-may-crash!
    } catch {
      raise err       -- err is the error object inside catch
    }

### Do

    -- for handling async functions there's the do keyword
    get-my-first-tweet = do
      [tweets] <- get-tweets-for: 'goatslacker'
      [first-tweet] <- process-and-return-first: tweets
      decorate-first-tweet: first-tweet

    -- which compiles into
    getMyFirstTweet = function (_$callback) {
      return getTweetsFor('goatslacker', function (tweets) {
        processAndReturnFirst(tweets, function (firstTweet) {
          _$callback(decorateFirstTweet(firstTweet));
        });
      });
    };

## License

[MIT](http://josh.mit-license.org)
