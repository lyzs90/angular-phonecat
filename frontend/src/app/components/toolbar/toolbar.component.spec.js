'use strict';

describe('toolbar', function() {
  var mockCartService, mockAuthService, $componentController, $scope, ctrl;

  // Load the module that contains the `toolbar` component before each test
  beforeEach(module('components.toolbar'));

  beforeEach(function() {
    // Mock the cart service
    mockCartService = sinon.stub({
      getCount: function() {return 5;}
    });

    // Mock the authentication service
    mockAuthService = sinon.stub({
      checkToken: function() {}
    });

    module(function($provide) {
      $provide.value('CartService', mockCartService);
      $provide.value('AuthService', mockAuthService);
    });
  });

  // Test the controller
  describe('ToolbarController', function() {
    beforeEach(inject(function(_$componentController_, $rootScope) {
      // Mock the controller
      $scope = $rootScope.$new();
      $componentController = _$componentController_;
      ctrl = $componentController('toolbar', {$scope: $scope});
      ctrl.$onInit();
    }));

    it('should check if cart is empty', function() {
      expect(ctrl.isEmpty()).to.be.false();
    });

  });

});