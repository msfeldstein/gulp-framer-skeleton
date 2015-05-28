'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var connect = require('gulp-connect');

// add custom browserify options here
var customOpts = {
  entries: ['./src/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal
// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('default', function() {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.html', ['copy-index']);
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
  gulp.start('connect');
});

gulp.task('js', bundle); // so you can run `gulp js` to build the file


function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(connect.reload())
    .pipe(gulp.dest('./dist'));
}

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    open: true
  });
});

gulp.task('copy-index', function() {
  gulp.src('./src/index.html')
    .pipe(connect.reload())
    .pipe(gulp.dest('./dist'))
})