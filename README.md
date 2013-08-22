akira
======

Functional language that transpiles to JavaScript.

## Installing

with nodejs and npm

    npm install akira

git

    git clone git://github.com/goatslacker/akira.git
    ln -s (pwd)/akira/bin/akira /usr/local/bin/akira

## Usage

    ast [file]               - output the Mozilla Parse API for that file
    compile [file] [target]  - compile to JavaScript
    make [command] [args]    - run akira unit tests
    output [file]            - compile to JS and output
    repl                     - start the repl
    run [file]               - compile and interpret said file
    tokens [file]            - output the lexer tokens for that file
    version                  - akira version
    watch [file] [target]    - watch a file for changes and compile on change


## Overview

### Literals

String

    'i am a string'

Numbers

    42
    2.0
    9,000
    -3

Boolean

    true
    false

Maps

    cat = {
      @name 'Luna'
      @age 2
    }

Vectors

    [1 2 3 4]
    [true false]

Regular Expressions

    /[A-Z]+/g


### Operators

Math

    1 + 2
    4 - 1
    3 * 1
    9 / 3

Exponents

| akira  | javascript     |
| ------ | -------------- |
| 3 ** 3 | Math.pow(3, 3) |

Equality

    true == true
    false != true
    3 > 2
    2 < 3
    3 >= 3
    3 <= 3

Logical

    false || true
    true && true

Concat and Cons

    | akira              | javascript              |
    | ------------------ | ----------------------- |
    | [1] ++ [2]         | [1].concat(2)           |
    | 'hello' ++ 'world' | 'hello'.concat('world') |
    | 1 +: [2 3]         | [1].concat(2, 3)        |

Property Access

    { @key 'value' } !! 'key'  -- { key: 'value' }['key']
    { @key 'value' }.key       -- { key: 'value' }.key
    [1 2 3 4] !! 2             -- [1, 2, 3, 4][2]
    [1 2 3].1                  -- [1, 2, 3][0]


### Functions

Defining functions

    sum = fn [a b] {
      a + b
    }
    sub = fn [a b] {
      a - b
    }

Invoking

    sum 1 2

Invoking with no arguments

    'hello-world'.to-string!

IIFE/Beta-redex

    fn [] {
      number-of-balloons = 99
    }!

    (-> 'foobar')!

Anonymous functions

    fn [x] x * x


### Pipes

Functions can also be invoked or chained with pipes

    sum 1 2 | print        -- print(sum(1, 2))

Multiple expressions can be piped together

    1 | id | print           -- print(id(1))

Previous arguments are carried over into the next function call...

    1 | sum 2 | (== 3)   -- sum(2, 1) === 3

...and you can use _ (underscore) to place your argument

    2 | sub _ 1 | (== 1)    -- sub(2, 1) === 1


### Scope

In akira you may not redeclare a variable, so in reality variables are not
really variables, they are symbols; you can also think of them as constants.

    a = 1
    b = true
    c = [1 2 3]
    b = false    -- throws a ReferenceError at compile time

So this prevents you from shadowing symbols and misusing scope. You also don't
need to include the 'var' as there are no globals.

    a = 1        -- outter `a`
    b = 2
    c = fn [] {
      a = 2      -- creates a local `a`
      b          -- `b` can be accessed in here
    }


### Conditionals

If statements

    n = 4
    is-n-four = if n == 4
      then true
      else false

Multiple conditions

    cond
      n == 4 ? n
      n == 2 ? n + 2
      else ? 0

### Pattern Matching

Factorial implemented using pattern matching

    fact = match {
      [1] 1
      [n] n * (fact n - 1)
    }

This splits up the list into x = head(list) and xs = tail(list)

    sort-even-odd = fn [[x, & xs]] {
      cond
        not x ? []
        odd x ? (sort-even-odd xs) ++ [x]
        else ? x +: (sort-even-odd xs)
    }

    [1 2 3 4 5 6] | sort-even-odd | assert-deep [2 4 6 5 3 1]


### Exceptions

    try {
      some-function-that-may-crash!
    } catch err {
      raise err
    }

### Do

For handling async functions there's the do keyword...

    get-my-first-tweet = do
      [tweets] <- get-tweets-for 'goatslacker'
      [first-tweet] <- process-and-return-first tweets
      decorate-first-tweet first-tweet

...which compiles into

    getMyFirstTweet = function (_$callback) {
      return getTweetsFor('goatslacker', function (tweets) {
        processAndReturnFirst(tweets, function (firstTweet) {
          _$callback(decorateFirstTweet(firstTweet));
        });
      });
    };

## Text Editor Support

ViM: https://github.com/goatslacker/akira.vim

## License

[MIT](http://josh.mit-license.org)
