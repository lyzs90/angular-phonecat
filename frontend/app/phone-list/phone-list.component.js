(function() {
  'use strict';

  // Register `phoneList` component, along with its associated controller and template
  angular.
    module('phoneList').
    component('phoneList', {
      templateUrl: 'phone-list/phone-list.template.html',
      controller: PhoneListController
    });

    PhoneListController.$inject = ['Phone', 'spinnerService', '$q'];

    function PhoneListController(Phone, spinnerService, $q) {
	  var vm = this;
		
      vm.$onInit = function() {
        vm.isLoading = true;
      };

      vm.getPhones = getPhones;
      vm.orderProp = 'age';
	  
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
        spinnerService.show('loader');
        Phone.getPhones()
		  .query()
          .$promise
          .then(delay(3000))
          .then(function(value) {
            vm.isLoading = false;
            spinnerService.hide('loader');
            vm.phones = value;
          });
      }
    }
})();
