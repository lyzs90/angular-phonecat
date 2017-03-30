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
    'ui.router',
    'core',
    'toolbar',
    'home',
    'profile',
    'phoneDetail',
    'phoneList'
  ]);
})();

