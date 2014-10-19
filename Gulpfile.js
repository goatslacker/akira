var akira = require('gulp-akira')
var esprima = require('gulp-esprima')
var gulp = require('gulp')
var rename = require('gulp-rename')
var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify')

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

gulp.task('watch', function () {
  gulp.watch(paths.lexer, ['lexer'])
  gulp.watch(paths.grammar, ['grammar'])
  gulp.watch(paths.ast, ['ast'])
  gulp.watch(paths.nodes, ['nodes'])
  gulp.watch(paths.core, ['core'])
  gulp.watch(paths.akira, ['binary'])
})

gulp.task('lexer', transpile(paths.lexer, dest.lang))

gulp.task('grammar', transpile(paths.grammar, dest.lang))

gulp.task('parser', ['grammar'], function () {
  var vm = require('gulp-vm')
  gulp.src('./lib/lang/grammar.js')
    .pipe(streamify(vm(function (x) {
      return x.generate()
    })))
    .pipe(rename(function (path) {
      path.basename = 'parser'
    }))
    .pipe(gulp.dest('./lib/lang'))
})

gulp.task('compiler', transpile(paths.compiler, dest.lang))

gulp.task('ast', transpile(paths.ast, dest.ast))

gulp.task('nodes', transpile(paths.nodes, dest.nodes))

gulp.task('binary', transpile(paths.binary, dest.binary))

// XXX
gulp.task('core', function () {
  return

//  gulp.src(paths.core)
//    .pipe(streamify(akira(function (code, file) {
//      return this.transpile(file.path, code)
//    })))
//    .pipe(rename(function (path) {
//      path.extname = '.js'
//    }))
//    .pipe(esprima())
//    .pipe(gulp.dest('./tmp'))
})

// XXX
gulp.task('test', function () {
  return

//  gulp.src('test/*.akira')
//    .pipe(streamify(akira(function (code, file) {
//      return this.run(file.path, code, {
//        ok: function () {
//          console.log('@@@@@@@@@')
//        }
//      })
//    })))
})

gulp.task('default', ['lexer', 'parser', 'compiler', 'ast', 'nodes', 'core', 'binary', 'grammar', 'parser'])
gulp.task('all', ['default'])
gulp.task('lang', ['lexer', 'parser', 'compiler'])
gulp.task('rest', ['ast', 'nodes', 'core', 'binary'])
