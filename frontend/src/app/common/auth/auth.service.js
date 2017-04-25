angular.
  module('common.auth').
  factory('AuthService', AuthService);

/**
 * @name AuthService
 * @desc Service for passing authentication status, checking for JWT token     * and handling login/logout
 * @ngInject
 */
function AuthService(lock, angularAuth0, store, jwtHelper, authManager, $state) {
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
   * @desc Get the JWT that is saved in local storage and if it is there,      * check whether it is expired. Then update the auth state in authManager.
   */
  function checkToken() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!service.isAuthenticated) {
          authManager.authenticate();
        }
      } else {
        authManager.unauthenticate();
        service.login();
      }
    }
  }

  /**
   * @name isAuthenticated
   * @desc Checks the auth state stored in authManager
   */
  function isAuthenticated() {
    return authManager.isAuthenticated();
  }

  /**
   * @name login
   * @desc Uses the Auth0 lock widget for login. Token/profile is stored in    * local storage. Auth state is managed by authManager.
   */
  function login() {
    lock.show();
    lock.on('authenticated', function(authResult) {
      store.set('token', authResult.idToken);

      authManager.authenticate();

      lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
          console.log(error);
        }
        store.set('profile', JSON.stringify(profile));
      });

      $state.go('home.phones');
    });
  }

  /**
   * @name logout
   * @desc Logs user out and clears local storage / auth state. User is        * redirected to home route. Clears auth state from authManager.
   */
  function logout() {
    auth.logout();
    authManager.unauthenticate();

    store.remove('profile');
    store.remove('token');
  }
}
