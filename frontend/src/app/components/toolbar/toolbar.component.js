// Register `toolbar` component, along with its associated controller and template
angular.
  module('components.toolbar').
  component('toolbar', {
    templateUrl: './toolbar.template.html',
    controller: ToolbarController
  });

/**
 * @name ToolbarController
 * @desc Controller for checking local storage whenever route changes
 * @ngInject
 */
function ToolbarController(AuthService, $scope) {
  var vm = this;

  vm.$onInit = function () {
    vm.login = AuthService.login;
    vm.logout = AuthService.logout;

    AuthService.checkToken(); 
  };

  $scope.$watch(
    function() { return AuthService.isAuthenticated; },
    function() {
      vm.isAuthenticated = AuthService.isAuthenticated;
  });
}
