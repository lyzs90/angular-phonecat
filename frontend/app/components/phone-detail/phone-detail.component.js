(function() {
  'use strict';

  // Register `phoneDetail` component, along with its associated controller and template
  angular.
    module('components.phoneDetail').
    component('phoneDetail', {
      templateUrl: 'components/phone-detail/phone-detail.template.html',
      controller: PhoneDetailController
    });

  /**
   * @name PhoneDetailController
   * @desc Controller for retrieving phone details
   * @ngInject
   */
  function PhoneDetailController($stateParams, PhoneService) {
    var vm = this;

    vm.setImage = setImage;

    vm.phone = PhoneService
      .getPhones()
      .get({phoneId: $stateParams.phoneId}, function(phone) {
        vm.setImage(phone.images[0]);
      });
    
    /**
     * @name setImage
     * @desc Function to set the main phone image. To be triggered by clicking.
     * @param {String} imageUrl
     */
    function setImage(imageUrl) {
      vm.mainImageUrl = imageUrl;
    }

    // scroll to top on init
    window.scrollTo(0, 0);
  }
})();
