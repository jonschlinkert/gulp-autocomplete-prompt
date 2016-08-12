'use strict';

var autocomplete = require('./');
var gulp = require('gulp');

gulp.task('default', function() {
  return gulp.src('*.*', {dot: true})
    .pipe(autocomplete())
    .pipe(gulp.dest('temp'));
});
