var akira = require('gulp-akira')
var esprima = require('gulp-esprima')
var gulp = require('gulp')
var rename = require('gulp-rename')
var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify')
var util = require('gulp-util')
var vm = require('gulp-vm')

const paths = {
  ast: './src/ast/*.akira',
  binary: './src/akira/index.akira',
  compiler: './src/lang/compiler.akira',
  core: './src/core/core.akira',
  grammar: './src/lang/grammar.akira',
  lexer: './src/lang/lexer.akira',
  nodes: './src/lang/nodes/*.akira',
}

const dest = {
  ast: './node_modules/ast/',
  binary: './lib/akira/',
  lang: './lib/lang/',
  nodes: './lib/lang/nodes/',
}

function transpile(from, to) {
  return function () {
    return gulp.src(from)
      .pipe(streamify(akira(function (code, file) {
        return this.transpile(file.path, code)
      })))
      .pipe(rename(function (path) {
        path.extname = '.js'
      }))
      .pipe(gulp.dest(to))
  }
}

function test() {
  return gulp.src('./test/*.akira')
    .pipe(streamify(akira(function (code, file) {
      util.log('Running', util.colors.magenta(file.path))
      return this.transpile(file.path, code)
    })))
    .pipe(streamify(vm()))
}

function parser() {
  return gulp.src('./lib/lang/grammar.js')
    .pipe(streamify(vm(function (x) {
      return x.generate()
    })))
    .pipe(rename(function (path) {
      path.basename = 'parser'
    }))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./lib/lang'))
}

function core() {
  return gulp.src(paths.core)
    .pipe(streamify(akira(function (code, file) {
      return this.transpile(file.path, code)
    })))
    .pipe(rename(function (path) {
      path.extname = '.js'
    }))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./lib/core'))
}

gulp.task('watch', function () {
  gulp.watch(paths.lexer, ['lexer'])
  gulp.watch(paths.grammar, ['grammar'])
  gulp.watch(paths.ast, ['ast'])
  gulp.watch(paths.nodes, ['nodes'])
  gulp.watch(paths.core, ['core'])
  gulp.watch(paths.akira, ['binary'])
})

// Single tasks
gulp.task('lexer', transpile(paths.lexer, dest.lang))
gulp.task('grammar', transpile(paths.grammar, dest.lang))
gulp.task('parser', ['grammar'], parser)
gulp.task('compiler', transpile(paths.compiler, dest.lang))
gulp.task('ast', transpile(paths.ast, dest.ast))
gulp.task('nodes', transpile(paths.nodes, dest.nodes))
gulp.task('binary', transpile(paths.binary, dest.binary))
gulp.task('core', core)
gulp.task('test', test)
gulp.task('rest', ['ast', 'nodes', 'core', 'binary'])

// Dependent tasks
gulp.task('lexer-sync', transpile(paths.lexer, dest.lang))
gulp.task('grammar-sync', ['lexer-sync'], transpile(paths.grammar, dest.lang))
gulp.task('parser-sync', ['grammar-sync'], parser)
gulp.task('compiler-sync', ['parser-sync'], transpile(paths.compiler, dest.lang))
gulp.task('lang', ['compiler-sync'])
gulp.task('ast-sync', ['lang'], transpile(paths.ast, dest.ast))
gulp.task('nodes-sync', ['lang'], transpile(paths.nodes, dest.nodes))
gulp.task('binary-sync', ['lang'], transpile(paths.binary, dest.binary))
gulp.task('core-sync', ['lang'], core)
gulp.task('rest-sync', ['ast-sync', 'nodes-sync', 'binary-sync', 'core-sync'])

// Main
gulp.task('default', ['rest-sync'], test)
