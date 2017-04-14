//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      'dist/js/vendor.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'http://cdn.auth0.com/js/lock/10.13.0/lock.min.js',
      'http://cdn.auth0.com/js/auth0/8.4.0/auth0.min.js',
      'dist/js/bundle.js',
      'src/**/*.spec.js'
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
