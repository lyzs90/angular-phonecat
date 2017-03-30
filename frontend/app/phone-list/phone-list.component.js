(function() {
  'use strict';

  // Register `phoneList` component, along with its associated controller and template
  angular.
    module('phoneList').
    component('phoneList', {
      templateUrl: 'phone-list/phone-list.template.html',
      controller: PhoneListController
    });

    PhoneListController.$inject = ['Phone', 'spinnerService', '$q', '$rootScope'];

    function PhoneListController(Phone, spinnerService, $q, $rootScope) {
	    var vm = this;

      vm.getPhones = getPhones;
      vm.orderProp = 'age';
		
      vm.$onInit = function() {
        vm.dataLoaded = false;
      };
	  
	    function delay(ms) {
        return function(value) {
          return $q(function(resolve, reject) {
            setTimeout(function() {
              resolve(value);
            }, ms);
          });
        };
      }

      function getPhones() {
        $rootScope.$watch('isAuthenticated', function() {
          if($rootScope.isAuthenticated) {
            spinnerService.show('loader');
            Phone.getPhones()
              .query()
              .$promise
              .then(delay(500))
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
