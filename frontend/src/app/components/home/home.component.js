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
  function HomeController(AuthService) {
    var vm = this;

    vm.$onInit = function () {
      AuthService.checkToken();

      vm.isAuthenticated = AuthService.isAuthenticated;
    };
  }
