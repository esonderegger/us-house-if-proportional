const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const rollup = require('rollup').rollup;
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const rollupBabel = require('rollup-plugin-babel');
const rollupUglify = require('rollup-plugin-uglify');

gulp.task('sasslint', function() {
  return gulp.src(['docs-scss/**/*.scss', 'docs-scss/**/*.css'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('css', ['sasslint'], function() {
  return gulp.src('docs-scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('docs'));
});

gulp.task('eslint', function() {
  return gulp.src(['docs-js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('js', function() {
  return rollup({
    entry: 'docs-js/main.js',
    plugins: [
      nodeResolve({
        jsnext: true,
        main: true,
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      rollupBabel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: ['es2015-rollup', 'react'],
      }),
      rollupUglify(),
    ],
  }).then(function(bundle) {
    return bundle.write({
      format: 'iife',
      sourceMap: 'inline',
      moduleName: 'main',
      dest: 'docs/main.min.js',
    });
  });
});

gulp.task('build', ['css', 'js']);

gulp.task('connect', function() {
  connect.server({
    root: './docs',
    livereload: false,
  });
});

gulp.task('watch', function() {
  gulp.watch(['docs-js/**/*.js'], ['js']);
  gulp.watch(['docs-scss/**/*.scss'], ['css']);
});

gulp.task('default', ['build', 'connect', 'watch']);
