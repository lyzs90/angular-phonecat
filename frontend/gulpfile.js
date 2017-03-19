var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util')
var babel = require('gulp-babel')

// Copy vendor files
gulp.task('vendor', function () {
    gulp.src([
        './node_modules/angular-auth0/dist/angular-auth0.js',
        './node_modules/angular-lock/dist/angular-lock.js',
        './node_modules/angular-jwt/dist/angular-jwt.js'
    ])
        .pipe(gulp.dest('./app/vendor/'))
});

// Transpile, uglify and bundle angular modules
gulp.task('scripts', function () {
  return gulp.src(['app/**/*.module.js', 'app/**/*.config.js', 'app/**/*.animations.js', 'app/**/*.component.js', 'app/**/*.service.js', 'app/**/*.filter.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('app.bundle.js'))
      .pipe(ngAnnotate())
      .pipe(babel())
      .pipe(uglify().on('error', function(err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
        this.emit('end');
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app'));
});

gulp.task('default', ['scripts', 'vendor']);