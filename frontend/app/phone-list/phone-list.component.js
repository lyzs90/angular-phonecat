(function() {
  'use strict';

  // Register `phoneList` component, along with its associated controller and template
  angular.
    module('phoneList').
    component('phoneList', {
      templateUrl: 'phone-list/phone-list.template.html',
      controller: PhoneListController
    });

    PhoneListController.$inject = ['Phone', 'Auth', 'spinnerService', '$q', '$scope'];

    function PhoneListController(Phone, Auth, spinnerService, $q, $scope) {
	    var vm = this;

      vm.getPhones = getPhones;
      vm.orderProp = 'age';
		
      vm.$onInit = function() {
        vm.dataLoaded = false;
      };

      function getPhones() {
        $scope.$watch(
          function() { return Auth.isAuthenticated; }, 
          function() {
            if(Auth.isAuthenticated) {
              spinnerService.show('loader');
              Phone.getPhones()
                .query()
                .$promise
                .then(function(value) {
                  vm.dataLoaded = true;
                  spinnerService.hide('loader');
                  vm.phones = value;
                });
            }
        });
      }
    }
})();
