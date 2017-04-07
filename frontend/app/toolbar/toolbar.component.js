(function() {
  'use strict';

  // Register `toolbar` component, along with its associated controller and template
  angular.
    module('toolbar').
    component('toolbar', {
      templateUrl: 'toolbar/toolbar.template.html',
      controller: ToolbarController
    });

    /**
     * @name ToolbarController
     * @desc Controller for checking local storage whenever route changes
     * @ngInject
     */
    function ToolbarController(Auth, $scope) {
	  var vm = this;

      vm.$onInit = function () {
        vm.login = Auth.login;
        vm.logout = Auth.logout;

        Auth.checkToken(); 
      };

      $scope.$watch(
        function() { return Auth.isAuthenticated; },
        function() {
          vm.isAuthenticated = Auth.isAuthenticated;
      });
    }
})();

