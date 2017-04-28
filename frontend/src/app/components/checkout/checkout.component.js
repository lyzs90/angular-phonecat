angular
  .module('components.checkout')
  .component('checkout', {
    templateUrl: './checkout.template.html',
    bindings: {
      grandTotal: '<',
      items: '<'
    },
    controller: CheckoutController
  });

// TODO: validate clientside
/**
 * @name CheckoutController T
 * @desc Controller for validating cart before checkout
 * @ngInject
 */
function CheckoutController(CartService) {
  var vm = this;
  
  vm.$onInit = function () {
    vm.getCount = CartService.getCount;
    vm.getTotal = CartService.getTotal;
    vm.isInvalid = isInvalid;
  };

  /**
   * @name isInvalid
   * @desc Check if cart is empty and/or grandTotal is zero
   */
  function isInvalid() {
    var invalidCount = vm.getCount() === 0;
    var invalidAmount = vm.getTotal() === 0;
    return (invalidCount && invalidAmount);
  }
}