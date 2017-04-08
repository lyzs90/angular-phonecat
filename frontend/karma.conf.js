//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-spinners/dist/angular-spinners.min.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/a0-angular-storage/dist/angular-storage.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'http://cdn.auth0.com/js/lock/10.13.0/lock.min.js',
      'http://cdn.auth0.com/js/auth0/8.4.0/auth0.min.js',
      'vendor/angular-auth0.js',
      'vendor/angular-lock.js',
      'vendor/angular-jwt.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(bower_components)/**/*!(.module|.spec).js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['mocha', 'sinon', 'chai', 'dirty-chai'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-sinon',
      'karma-chai',
      'karma-dirty-chai'
    ]

  });
};
