(function() {
  'use strict';

  // Register `phoneList` component, along with its associated controller and template
  angular.
    module('phoneListModule').
    component('phoneList', {
      templateUrl: 'phone-list/phone-list.template.html',
      controller: PhoneListController
    });

    /**
     * @name PhoneListController
     * @desc Controller for retrieving the phone list
     * @ngInject
     */
    function PhoneListController(Phone, Auth, spinnerService, $q, $scope) {
	    var vm = this;

      vm.getPhones = getPhones;
      vm.orderProp = 'age';
		
      vm.$onInit = function() {
        vm.dataLoaded = false;
      };

      /**
       * @name getPhones
       * @desc Retrieves data if user is authenticated. Loads a spinner while  * waiting for async request to resolve.
       */
      function getPhones() {
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

      $scope.$watch(
        function() { return Auth.isAuthenticated; }, 
          function() {
            if(Auth.isAuthenticated) {
              vm.getPhones();
            }
          }
      );

    }
})();
