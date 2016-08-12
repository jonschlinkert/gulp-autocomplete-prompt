'use strict';

var autocomplete = require('./');
var gulp = require('gulp');

gulp.task('default', function() {
  return gulp.src('*.js')
    .pipe(autocomplete())
    .pipe(gulp.dest('temp'));
});
