'use strict';

describe('phoneDetail', function() {
  var mockPhoneService, $componentController, $scope, ctrl;

  // Load the module that contains the `phoneDetail` component before each test
  beforeEach(module('components.phoneDetail'));

  beforeEach(function() {
    // Mock the phone service
    mockPhoneService = {
      getPhones: sinon.stub().returns({
        get: sinon.stub()
      })
    };
    
    module(function($provide) {
      $provide.value('PhoneService', mockPhoneService);
    });
  });

  // Test the controller
  describe('PhoneDetailController', function() {
    beforeEach(inject(function(_$componentController_, $rootScope) {
      // Mock the controller
      $scope = $rootScope.$new();
      $componentController = _$componentController_;
      ctrl = $componentController('phoneDetail', {$scope: $scope});
    }));

    it('should call PhoneService when initialised', function() {
      assert(mockPhoneService.getPhones.calledOnce);
    });

  });

});
