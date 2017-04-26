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
function CheckoutController() { // TODO: script tag only reads initial parameters once, before angular has time to compile. Should dynamically create the script tag

}