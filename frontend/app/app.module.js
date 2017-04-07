(function() {
  'use strict';

  // Define the `phonecatApp` module
  angular.module('phonecatApp', [
    'angular-jwt', 
    'ngMaterial',
    'ngAnimate',
    'ui.router',
    'core',
    'toolbar',
    'home',
    'cart',
    'phoneDetail',
    'phoneList'
  ]);
})();

