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
function ToolbarController(AuthService) {
  var vm = this;

  vm.$onInit = function () {
    AuthService.checkToken();

    vm.login = AuthService.login;
    vm.logout = AuthService.logout;
    vm.isAuthenticated = AuthService.isAuthenticated; 
  };
}
