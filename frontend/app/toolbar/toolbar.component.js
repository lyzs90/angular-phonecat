(function() {
  'use strict';

  // Register `toolbar` component, along with its associated controller and template
  angular.
    module('toolbar').
    component('toolbar', {
      templateUrl: 'toolbar/toolbar.template.html',
      controller: ToolbarController
    });

    ToolbarController.$inject = ['lock', 'angularAuth0', 'store', '$location', '$scope', 'jwtHelper', 'authManager'];

    function ToolbarController(lock, angularAuth0, store, $location, $scope, jwtHelper, authManager) {
      this.$onInit = function () {
        // Get the JWT that is saved in local storage
        // and if it is there, check whether it is expired.
        // If it isn't, set the user's auth state
        var token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!this.isAuthenticated) {
              authManager.authenticate();

              //Store the status in the scope 
              this.isAuthenticated = true;
            }
          }
        }
      }

      var vm = this;

      vm.auth = angularAuth0;
      vm.lock = lock;
      vm.login = login;
      vm.logout = logout;

      function login() {
        vm.lock.show();
        lock.on('authenticated', function(authResult) {
          store.set('token', authResult.idToken);

          // set isAuthenticated to true
          $scope.isAuthenticated = true;

          lock.getProfile(authResult.idToken, function(error, profile) {
            if (error) {
              console.log(error);
            }
            store.set('profile', JSON.stringify(profile));
          });
        });
      }

      function logout() {
        vm.auth.logout();

        // set isAuthenticated to false
        vm.isAuthenticated = false;

        store.remove('profile');
        store.remove('token');
        $location.path('/');
      }
    }
})();

