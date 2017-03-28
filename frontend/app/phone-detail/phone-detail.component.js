(function() {
  'use strict';

  // Register `phoneDetail` component, along with its associated controller and template
  angular.
    module('phoneDetail').
    component('phoneDetail', {
      templateUrl: 'phone-detail/phone-detail.template.html',
      controller: PhoneDetailController
    });

  PhoneDetailController.$inject = ['$routeParams', 'Phone'];

  function PhoneDetailController($routeParams, Phone) {
    var vm = this;

    vm.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      vm.setImage(phone.images[0]);
    });

    vm.setImage = function setImage(imageUrl) {
      vm.mainImageUrl = imageUrl;
    };

    // scroll to top on init
    window.scrollTo(0, 0);
  }
})();
