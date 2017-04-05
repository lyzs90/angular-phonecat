(function() {
  'use strict';

  // Define the `core.auth` module
  angular.module('core.auth', [
    'auth0.lock',
    'auth0.auth0',
    'angular-storage'
  ]);
})();
