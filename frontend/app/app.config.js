'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider', 'angularAuth0Provider', 'lockProvider', 'storeProvider', 'jwtInterceptorProvider', '$httpProvider',
    function config($locationProvider, $routeProvider, angularAuth0Provider, lockProvider, storeProvider, jwtInterceptorProvider, $httpProvider) {
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

        jwtInterceptorProvider.tokenGetter = function(store) {
          return store.get('token');
        }

        //$httpProvider.interceptors.push('jwtInterceptor');
    }
  ])
