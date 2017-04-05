(function() {
  'use strict';

  angular
    .module('home')
    .component('home', {
      templateUrl: 'home/home.template.html',
      controller: HomeController
    });

    HomeController.$inject = ['Auth', '$scope'];

    function HomeController(Auth, $scope) {
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
