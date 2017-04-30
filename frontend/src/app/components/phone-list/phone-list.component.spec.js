'use strict';

describe('phoneList', function() {
  var mockAuthService, mockSpinnerService, mockPhoneService, $componentController, $scope, ctrl;

  // Load the module that contains the `phoneList` component before each test
  beforeEach(module('components.phoneList'));

  beforeEach(function() {
    // Mock the authentication service
    mockAuthService = sinon.stub({
      checkToken: function() {}
    });

    // Mock the spinner service
    mockSpinnerService = sinon.stub({
      show: function() {}, 
      hide: function() {}
    });

    // Mock the phone service
    mockPhoneService = {
      getPhones: sinon.stub().returns({
        query: sinon.stub().returns({
          $promise: new Promise(function(resolve, reject) {
            resolve();
          })
        })
      })
    };
    
    module(function($provide) {
      $provide.value('AuthService', mockAuthService);
      $provide.value('spinnerService', mockSpinnerService);
      $provide.value('PhoneService', mockPhoneService);
    });
  });

  // Test the controller
  describe('PhoneListController', function() {
    beforeEach(inject(function( _$componentController_, $rootScope) {
      // Mock the controller
      $scope = $rootScope.$new();
      $componentController = _$componentController_;
      ctrl = $componentController('phoneList', {$scope: $scope});
      ctrl.$onInit();
    }));

    it('should call spinner when fetching data', function() {
      // Trigger data fetch
      ctrl.getPhones();

      assert(mockSpinnerService.show.calledOnce);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(angular.equals(ctrl.orderProp, 'age')).to.be.true();
    });

  });

});
