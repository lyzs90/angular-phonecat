import gulp from 'gulp';
import concat from 'gulp-concat';
import append from 'gulp-append';
import sourcemaps from 'gulp-sourcemaps';
import wrap from 'gulp-wrap';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import yargs from 'yargs';
import ngAnnotate from 'gulp-ng-annotate';
import templateCache from 'gulp-angular-templatecache';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import server from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import del from 'del';
import path from 'path';

/*-----------
  Constants
------------*/

const argv = yargs.argv;
const root = 'src/';
const paths = {
  dist: './dist/',
  temp: './temp/',
  scripts: [`${root}/app/**/*.js`, `!${root}/app/**/*.spec.js`],
  tests: `${root}/app/**/*.spec.js`,
  styles: [`${root}/scss/*.css`, `${root}/scss/*.scss`],
  templates: `${root}/app/**/*.html`,
  modules: {
    bower: [ // Bower Components
      'jquery/dist/jquery.js',
      'angular/angular.js',
      'angular-spinners/dist/angular-spinners.js',
      'angular-aria/angular-aria.js',
      'a0-angular-storage/dist/angular-storage.js',
      'angular-material/angular-material.js',
      'angular-animate/angular-animate.js',
      'angular-resource/angular-resource.js',
      'angular-ui-router/release/angular-ui-router.js'
    ],
    node: [ // Node Modules
      'angular-auth0/dist/angular-auth0.js',
      'angular-lock/dist/angular-lock.js',
      'angular-jwt/dist/angular-jwt.js',
      'ng-infinite-scroll/build/ng-infinite-scroll.js'
    ],
    style: [ // Bower Stylesheets
      'bootstrap/dist/css/bootstrap.css',
      'angular-material/angular-material.css'
    ]
  },
  static: [
    `${root}/index.html`,
    `${root}/fonts/**/*`,
    `${root}/img/**/*`
  ]
};

/*-------------
  Housekeeping
--------------*/

gulp.task('temp', cb => del(paths.temp + '**/*', cb));
gulp.task('dist', cb => del(paths.dist + '**/*', cb));

gulp.task('clean', ['temp', 'dist']);

/*-----------
  Cache Html
-------------*/

gulp.task('templates', () => {
  return gulp.src(paths.templates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      root: 'app',
      standalone: true,
      transformUrl: (url) => {
        return url.replace(path.dirname(url), '.');
      }
    }))
    .pipe(gulp.dest('./'));
});

/*---------------
  Vendor Modules
----------------*/

// Bower Components
gulp.task('bower-modules', () => {
  return gulp.src(paths.modules.bower.map(item => 'bower_components/' + item))
    .pipe(concat('bower-modules.js'))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest('./temp/'));
});

// Node Modules
gulp.task('node-modules', () => {
  return gulp.src(paths.modules.node.map(item => 'node_modules/' + item))
    .pipe(concat('node-modules.js'))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest('./temp/'));
});

gulp.task('modules', ['bower-modules', 'node-modules', 'templates'], () => {
  return gulp.src(['./temp/bower-modules.js', './temp/node-modules.js'])
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'));
});

/*-------------------
  Vendor Stylesheets
--------------------*/

gulp.task('bower-styles', () => {
  return gulp.src(paths.modules.style.map(item => 'bower_components/' + item))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(paths.dist + 'css/'));
});

/*-------------------
  Custom Stylesheets
--------------------*/

gulp.task('styles', ['bower-styles'], () => {
  return gulp.src(paths.styles)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.dist + 'css/'));
});

/*----------------
  Custom Scripts
-----------------*/

gulp.task('scripts', ['modules'], () => {
  return gulp.src([
      `!${root}/app/**/*.spec.js`,
      `${root}/app/**/*.module.js`,
      ...paths.scripts,
      './templates.js'
    ])
    .pipe(sourcemaps.init())
      .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
      .pipe(concat('bundle.js'))
      .pipe(babel())
      .pipe(ngAnnotate())
      .pipe(
        gulpif(argv.deploy, uglify().on('error', (err) => {
          gutil.log(gutil.colors.red('[Error]'), err.toString());
          this.emit('end');
        }))
      )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'js/'));
});

/*--------------------
  Browser-sync Server
---------------------*/

server.create();

gulp.task('serve', () => {
  return server.init({
    files: [`${paths.dist}/**`],
    port: 8000,
    server: {
      baseDir: paths.dist,
      middleware: [ historyApiFallback() ]
    }
  });
});

/*---------------
  Static Files
---------------*/

gulp.task('copy', ['clean'], () => {
  return gulp.src(paths.static, { base: 'src' })
    .pipe(gulp.dest(paths.dist));
});

/*----------
  Watchers
-----------*/

gulp.task('watch', ['serve', 'scripts'], () => {
  gulp.watch([paths.scripts, paths.templates], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

/*------
  Main
-------*/

gulp.task('default', [
  'copy',
  'styles',
  'serve',
  'watch'
]);

gulp.task('production', [
  'copy',
  'styles',
  'scripts'
]);