(function() {
  'use strict';

  angular
    .module('cart')
    .component('cart', {
      templateUrl: 'cart/cart.template.html',
      controller: CartController
    });

  CartController.$inject = ['store'];

  function CartController(store) {
    var vm = this;
    vm.profile = JSON.parse(store.get('profile'));
  }
})();
