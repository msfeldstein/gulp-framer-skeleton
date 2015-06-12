'use strict';

var OUT_PATH = "dist";

var watchify = require('watchify');
var browserify = require('browserify');
var coffeeify = require('gulp-coffeeify');
var gulp = require('gulp');
var glob = require('glob');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var bonjour = require('frameless-connect');
var myip = require('my-ip');
var qrcode = require('qrcode-terminal');

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
  gulp.watch('src/images/**/*', ['images']);
  watch(OUT_PATH).pipe(connect.reload());
  gulp.start('connect');
});

gulp.task('coffee', function() {
  var coffeeFiles = glob.sync('./src/index.coffee');
  var bundler = browserify({
    entries: coffeeFiles,
    transform: ['coffeeify'],
    extensions: ['.coffee'],
    debug: true
  });
  var watcher = watchify(bundler);
  return watcher
    .on('update', function() {
      watcher.bundle()
      .on('error', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(OUT_PATH))
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(OUT_PATH))
});

gulp.task('js', function() {
  var jsFiles = glob.sync('./src/index.js');
  var bundler = browserify({
    entries: jsFiles,
    debug: true
  });
  var watcher = watchify(bundler);
  return watcher
    .on('update', function() {
      watcher.bundle()
      .on('error', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(OUT_PATH))
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(OUT_PATH))
});


gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest(OUT_PATH + '/images'));
});

gulp.task('style', function() {
  return gulp.src('src/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(OUT_PATH));
});

gulp.task('copy-index', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest(OUT_PATH))
})

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
  gutil.log(gutil.colors.green("Listening on http://" + myip() + ":" + 8080))
  var spawn = require('child_process').spawn
  spawn('open', ['http://localhost:8080']);
  bonjour(8080);
});

gulp.task('ip', function() {
  qrcode.generate("http://" + myip());
  gutil.log(gutil.colors.green("http://" + myip() + ":" + 8080))
})
