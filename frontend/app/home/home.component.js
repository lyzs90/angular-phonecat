(function() {
  'use strict';

  angular
    .module('home')
    .component('home', {
      templateUrl: 'home/home.template.html',
      controller: HomeController
    });

    /**
     * @name HomeController
     * @desc Controller for binding auth state to Home template
     * @ngInject
     */
    function HomeController(Auth, $scope) { // TODO: how to avoid using scope and watcher?
      var vm = this;

      vm.$onInit = function () {
        Auth.checkToken(); 
      };

      $scope.$watch(
        function() { return Auth.isAuthenticated; }, 
        function() {
          vm.isAuthenticated = Auth.isAuthenticated;
      });
    }
})();
