(function() {
  'use strict';

  // Register `phoneDetail` component, along with its associated controller and template
  angular.
    module('phoneDetail').
    component('phoneDetail', {
      templateUrl: 'phone-detail/phone-detail.template.html',
      controller: PhoneDetailController
    });

  /**
   * @name PhoneDetailController
   * @desc Controller for retrieving phone details
   * @ngInject
   */
  function PhoneDetailController($stateParams, Phone) {
    var vm = this;

    vm.setImage = setImage;

    vm.phone = Phone
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
