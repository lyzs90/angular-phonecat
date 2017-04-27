// Register `success` component, along with its associated template
angular.
  module('components.success').
  component('success', {
    templateUrl: './success.template.html',
    controller: SuccessController
  });

  /**
   * @name SuccessController
   * @desc Controller for order success state
   * @ngInject
   */
  function SuccessController(CartService) {
    CartService.removeAllItems();
  }