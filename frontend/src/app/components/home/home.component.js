angular
  .module('components.home')
  .component('home', {
    templateUrl: './home.template.html',
    controller: HomeController
  });

  /**
   * @name HomeController
   * @desc Controller for binding auth state to Home template
   * @ngInject
   */
  function HomeController(AuthService, $scope) { // TODO: how to avoid using scope and watcher?
    var vm = this;

    vm.$onInit = function () {
      AuthService.checkToken(); 
    };

    $scope.$watch(
      function() { return AuthService.isAuthenticated; }, 
      function() {
        vm.isAuthenticated = AuthService.isAuthenticated;
    });
  }
