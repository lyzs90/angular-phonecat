(function() {
  'use strict';

  angular.
    module('core.auth').
    factory('Auth', Auth);

  Auth.$inject = ['lock', 'angularAuth0', 'store', 'jwtHelper', 'authManager', '$location'];

  function Auth(lock, angularAuth0, store, jwtHelper, authManager, $location) {
    var isAuthenticated = false;
    var auth = angularAuth0;

    var service = {
      isAuthenticated: isAuthenticated,
      checkToken: checkToken,
      login: login,
      logout: logout
    };

    return service;

    function checkToken() {
      // Get the JWT that is saved in local storage and if it is there, check whether it is expired. If it isn't, set the user's auth state
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!service.isAuthenticated) {
            authManager.authenticate();

            //Store the status in the scope 
            service.isAuthenticated = true;
          }
        }
      }
    }

    function login() {
      lock.show();
      lock.on('authenticated', function(authResult) {
        store.set('token', authResult.idToken);

        // set isAuthenticated to true
        service.isAuthenticated = true;

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }
          store.set('profile', JSON.stringify(profile));
        });
      });
    }

    function logout() {
      auth.logout();

      // set isAuthenticated to false
      service.isAuthenticated = false;

      store.remove('profile');
      store.remove('token');

      // redirect to home
      $location.path('/');
    }
  }
})();