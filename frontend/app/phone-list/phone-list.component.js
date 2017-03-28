(function() {
  'use strict';

  // Register `phoneList` component, along with its associated controller and template
  angular.
    module('phoneList').
    component('phoneList', {
      templateUrl: 'phone-list/phone-list.template.html',
      controller: PhoneListController
    });

    PhoneListController.$inject = ['Phone', 'spinnerService'];

    function PhoneListController(Phone, spinnerService) {
      this.$onInit = function() {
        this.isLoading = true;
      };

      var vm = this;

      vm.getPhones = getPhones;
      vm.orderProp = 'age';

      function getPhones() {
        spinnerService.show('loader');
        Phone.getPhones()
          .then(function(value) {
            vm.isLoading = false;
            spinnerService.hide('loader');
            vm.phones = value;
          });
      }
    }
})();
