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
    vm.loadMore = loadMore;
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
        vm.display = vm.phones.slice(0, 3);
      });
  }

  /**
   * @name loadMore
   * @desc Paging function for infinite scrolling. Triggered everytime         * infinite-scroll-distance is reached.
   */
  function loadMore(itemsToLoad = 1) {
    var cursor = vm.display.length - 1;  // index of current item in vm.phones
    var itemsRemaining = vm.phones.length - cursor - 1;
    for (var i = 0; i < itemsToLoad && i < itemsRemaining; i++) {
      vm.display.push(vm.phones[cursor + 1]);
    }
  }
}
