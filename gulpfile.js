'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var coffeeify = require('gulp-coffeeify');
var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var es6transpiler = require('gulp-es6-transpiler');
var bonjour = require('frameless-connect');

var OUT_PATH = "dist";

gulp.task('default', function() {
  gulp.start('style');
  gulp.start('coffee');
  gulp.start('js');
  gulp.start('images');
  gulp.start('copy-index');
  gulp.watch('src/style.scss', ['style']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.coffee', ['coffee']);
  gulp.watch('src/**/*.html', ['copy-index']);
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
  watch(OUT_PATH).pipe(connect.reload());
  gulp.start('connect');
});


gulp.task('coffee', function() {
  var coffeeFiles = glob.sync('./src/index.coffee');
  var bundler = browserify({
    entries: coffeeFiles,
    transform: ['coffeeify'],
    extensions: ['.coffee']
  });
  var watcher = watchify(bundler);
  return watcher
    .on('update', function() {
      watcher.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist'))
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('js', function() {
  var jsFiles = glob.sync('./src/index.js');
  var bundler = browserify({
    entries: jsFiles
  });
  var watcher = watchify(bundler);
  return watcher
    .on('update', function() {
      watcher.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist'))
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'))
});


gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('style', function() {
  return gulp.src('src/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
  var spawn = require('child_process').spawn
  spawn('open', ['http://localhost:8080']);
  bonjour(8080);
});

gulp.task('copy-index', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'))
})
