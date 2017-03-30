(function() {
  'use strict';

  // Register `toolbar` component, along with its associated controller and template
  angular.
    module('toolbar').
    component('toolbar', {
      templateUrl: 'toolbar/toolbar.template.html',
      controller: ToolbarController
    });

    ToolbarController.$inject = ['lock', 'angularAuth0', 'store', '$location', '$rootScope', 'jwtHelper', 'authManager'];

    function ToolbarController(lock, angularAuth0, store, $location, $rootScope, jwtHelper, authManager) {
	  var vm = this;

      vm.$onInit = function () {
        // Get the JWT that is saved in local storage
        // and if it is there, check whether it is expired.
        // If it isn't, set the user's auth state
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!$rootScope.isAuthenticated) {
              authManager.authenticate();

              //Store the status in the scope 
              $rootScope.isAuthenticated = true;
            }
          }
        }
      };

      vm.auth = angularAuth0;
      vm.lock = lock;
      vm.login = login;
      vm.logout = logout;

      function login() {
        vm.lock.show();
        lock.on('authenticated', function(authResult) {
          store.set('token', authResult.idToken);

          // set isAuthenticated to true
          $rootScope.isAuthenticated = true;

          lock.getProfile(authResult.idToken, function(error, profile) {
            if (error) {
              console.log(error);
            }
            store.set('profile', JSON.stringify(profile));
          });

          // redirect to catalog
          $location.path('/phones');
        });
      }

      function logout() {
        vm.auth.logout();

        // set isAuthenticated to false
        $rootScope.isAuthenticated = false;

        store.remove('profile');
        store.remove('token');
      }
      // redirect to home
      $location.path('/');
    }
})();

