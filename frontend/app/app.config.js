(function() {
  'use strict';

  angular.
    module('phonecatApp').
    config(config);

    config.$inject = ['$locationProvider' ,'$stateProvider', '$urlRouterProvider', 'angularAuth0Provider', 'lockProvider', 'storeProvider', 'jwtOptionsProvider', '$httpProvider'];

    function config($locationProvider, $stateProvider, $urlRouterProvider, angularAuth0Provider, lockProvider, storeProvider, jwtOptionsProvider, $httpProvider) {

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          template: '<home></home>'
        })
        .state('home.phones', {
          url: '^/phones',  // use absolute route
          template: '<phone-list></phone-list>'
        })
        .state('detail', {
          url: '/phone/:phoneId',
          template: '<phone-detail></phone-detail>'
        })
        .state('cart', {
          url: '/cart',
          template: '<cart></cart>'
        });

        angularAuth0Provider.init({
          domain: 'lyzs90.auth0.com',
          clientID: 'nt6YmK4w8KNLEcBXiNmIM07xnOpc8bVf'
        });

        lockProvider.init({
          clientID: 'nt6YmK4w8KNLEcBXiNmIM07xnOpc8bVf',
          domain: 'lyzs90.auth0.com',
          options: {
            _idTokenVerification: false,
            auth: {
              redirect: false
            }
          }
        });

        storeProvider.setStore('localStorage');

        jwtOptionsProvider.config({
          tokenGetter: ['options', 'store', function(options, store) {
            // Skip authentication for any requests ending in .html
            if (options.url.substr(options.url.length - 5) === '.html') {
              return null;
            }
            return store.get('token');
          }],
          whiteListedDomains: ['localhost']
        });

        $httpProvider.interceptors.push('jwtInterceptor');
    }
})();

