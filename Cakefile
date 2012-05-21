fs            = require 'fs'
{print}       = require 'util'
{spawn, exec} = require 'child_process'

# ANSI Terminal Colors
bold = '\033[0;1m'
green = '\033[0;32m'
reset = '\033[0m'
red = '\033[0;31m'

log = (message, color, explanation) ->
  console.log color + message + reset + ' ' + (explanation or '')

build = (watch, callback) ->
  if typeof watch is 'function'
    callback = watch
    watch = false
  options = ['-c', '-o', 'lib', 'src']
  options.unshift '-w' if watch

  coffee = spawn 'coffee', options
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> log data.toString(), red
  coffee.on 'exit', (status) -> callback?() if status is 0

test = (callback) ->
  options = ['bin/memory', 'test']
  spec = spawn 'node', options
  spec.stdout.on 'data', (data) -> print data.toString()
  spec.stderr.on 'data', (data) -> log data.toString(), red
  spec.on 'exit', (status) -> callback?() if status is 0


parser = (callback) ->
  parser = spawn 'node', ['lib/grammar.js']
  parser.stdout.on 'data', (data) -> print data.toString()
  parser.stderr.on 'data', (data) -> log data.toString(), red
  parser.on 'exit', (status) -> callback?() if status is 0


task 'build', ->
  build -> log ":)", green

task 'test', 'Run Vows', ->
  build -> test -> log ":)", green

task 'parser', 'make grammar', ->
  build -> parser -> log ":)", green
