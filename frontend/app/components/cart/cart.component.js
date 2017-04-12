(function() {
  'use strict';

  angular
    .module('components.cart')
    .component('cart', {
      templateUrl: 'components/cart/cart.template.html',
      controller: CartController
    });

  /**
   * @name CartController
   * @desc Controller for retrieving user profile in the cart
   * @ngInject
   */
  function CartController(store, CartService, $scope) {
    var vm = this;
    
    vm.$onInit = function () {
      vm.items = CartService.items;
      vm.removeItem = CartService.removeItem;
      vm.getTotal = CartService.getTotal;

      vm.profile = JSON.parse(store.get('profile')); 
    };

    $scope.$watch(
      function() { return CartService.items; }, 
      function() {
        vm.items = CartService.items;
    });
  }
})();
