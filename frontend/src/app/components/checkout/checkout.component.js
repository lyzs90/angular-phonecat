angular
  .module('components.checkout')
  .component('checkout', {
    templateUrl: './checkout.template.html',
    bindings: {
      grandTotal: '<',
      items: '<'
    }
  });