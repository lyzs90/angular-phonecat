var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify')

gulp.task('scripts', function () {
  return gulp.src(['app/**/*.module.js', 'app/**/*.config.js', 'app/**/*.animations.js', 'app/**/*.component.js', 'app/**/*.service.js', 'app/**/*.filter.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.bundle.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app'));
});

gulp.task('default', ['scripts']);