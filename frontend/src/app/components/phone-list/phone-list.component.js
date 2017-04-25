// Register `phoneList` component, along with its associated controller and template
angular.
  module('components.phoneList').
  component('phoneList', {
    templateUrl: './phone-list.template.html',
    controller: PhoneListController
  });

/**
 * @name PhoneListController
 * @desc Controller for retrieving the phone list
 * @ngInject
 */
function PhoneListController(PhoneService, AuthService, spinnerService, CartService) {
  var vm = this;

  vm.$onInit = function() {
    AuthService.checkToken();

    vm.dataLoaded = false;
    vm.orderProp = 'age';

    vm.getPhones = getPhones;
    vm.addItem = CartService.addItem;
  };

  /**
   * @name getPhones
   * @desc Retrieves data if user is authenticated. Loads a spinner while  * waiting for async request to resolve.
   */
  function getPhones() {
    spinnerService.show('loader');
    PhoneService.getPhones()
      .query()
      .$promise
      .then(function(value) {
        vm.dataLoaded = true;
        spinnerService.hide('loader');
        vm.phones = value;
      });
  }
}
