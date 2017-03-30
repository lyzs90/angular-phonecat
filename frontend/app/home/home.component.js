(function() {
  'use strict';

  angular
    .module('home')
    .component('home', {
      templateUrl: 'home/home.template.html',
      controller: HomeController
    });

    HomeController.$inject = ['$rootScope'];

    function HomeController($rootScope) {
    }
})();
