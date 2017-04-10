(function() {
  'use strict';

  angular.
    module('common.auth').
    factory('AuthService', AuthService);

  /**
   * @name AuthService
   * @desc Service for passing authentication status, checking for JWT token    * and handling login/logout
   * @ngInject
   */
  function AuthService(lock, angularAuth0, store, jwtHelper, authManager, $location) {
    var isAuthenticated = false;
    var auth = angularAuth0;

    var service = {
      isAuthenticated: isAuthenticated,
      checkToken: checkToken,
      login: login,
      logout: logout
    };

    return service;

    /**
     * @name checkToken
     * @desc Get the JWT that is saved in local storage and if it is there,    * check whether it is expired.
     */
    function checkToken() {
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

    /**
     * @name login
     * @desc Uses the Auth0 lock widget for login. Token/profile is stored in   * local storage and auth state is persisted in the singleton. 
     */
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

    /**
     * @name logout
     * @desc Logs user out and clears local storage / auth state. User is      * redirected to home route.
     */
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