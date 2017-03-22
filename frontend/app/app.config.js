'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider', 'angularAuth0Provider', 'lockProvider', 'storeProvider', 'jwtOptionsProvider', '$httpProvider',
    function config($locationProvider, $routeProvider, angularAuth0Provider, lockProvider, storeProvider, jwtOptionsProvider, $httpProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/phones', {
          template: '<phone-list></phone-list>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        }).
        otherwise('/phones');

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
            if (options.url.substr(options.url.length - 5) == '.html') {
              return null;
            }
            return store.get('token');
          }],
          whiteListedDomains: ['localhost']
        });

        $httpProvider.interceptors.push('jwtInterceptor');
    }
  ])
