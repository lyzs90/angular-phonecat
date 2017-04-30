angular.
  module('root').
  run(run);

/**
 * @name run
 * @desc Check that user is authenticated before allowing access to protected   * routes
 * @ngInject
 */
function run($transitions) {
  $transitions.onStart({}, function(trans) {
    // Inject the AuthService
    var auth = trans.injector().get('AuthService');
    // Check if state has a authenticate property and if user is authenticated
    if (trans.to().authenticate && !auth.isAuthenticated()) {
      // User isn't authenticated. Redirect to a new Target State
      return trans.router.stateService.target('home.login');
    }
  });
}