'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone', '$q', '$scope', 'spinnerService',
      function PhoneListController(Phone, $q, $scope, spinnerService) {
        this.$onInit = function() {
          $scope.isLoading = true;
        }

        var $ctrl = this;

        function delay(ms) {
          return function(value) {
            return $q(function(resolve, reject) {
              setTimeout(function() {
                resolve(value);
              }, ms)
            });
          }
        }

        $scope.getPhones = function() {
          spinnerService.show('loader');
          Phone.query()
            .$promise
            .then(delay(3000))
            .then(function(value) {
              $scope.isLoading = false;
              spinnerService.hide('loader');
              $ctrl.phones = value;
            });
        }
        
        this.orderProp = 'age';
      }
    ]
  });