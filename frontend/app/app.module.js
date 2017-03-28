(function() {
  'use strict';

  // Define the `phonecatApp` module
  angular.module('phonecatApp', [
    'auth0.lock',
    'angular-storage',
    'auth0.auth0',
    'angular-jwt', 
    'ngMaterial',
    'ngAnimate',
    'ngRoute',
    'core',
    'toolbar',
    'phoneDetail',
    'phoneList'
  ]);
})();

