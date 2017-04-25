angular.
  module('root').
  config(config);

/**
 * @name config
 * @desc Angular Configuration
 * @ngInject
 */
function config($locationProvider, $stateProvider, $urlRouterProvider, angularAuth0Provider, lockProvider, storeProvider, jwtOptionsProvider, $httpProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>',
      authenticate: false
    })
    .state('home.phones', {
      url: '^/phones',  // use absolute route
      template: '<phone-list></phone-list>',
      authenticate: true
    })
    .state('detail', {
      url: '/phone/:phoneId',
      template: '<phone-detail></phone-detail>',
      authenticate: true
    })
    .state('cart', {
      url: '/cart',
      template: '<cart></cart>',
      authenticate: true
    })
    .state('checkout', {
      url: '/checkout',
      template: '<checkout></checkout>',
      authenticate: true
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
      tokenGetter: ['store', function(store) {
        return store.get('token');
      }],
      unauthenticatedRedirector: ['$state', function($state) {
        $state.go('home');
      }],
      whiteListedDomains: ['localhost']
    });

    $httpProvider.interceptors.push('jwtInterceptor');
}
