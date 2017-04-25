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

/**
 * @name CheckoutController
 * @desc Controller for Stripe form
 * @ngInject
 */
function CheckoutController() {

}