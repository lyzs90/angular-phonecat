'use strict';

describe('toolbar', function() {
  var mockAuthService, $componentController, $scope, ctrl;

  // Load the module that contains the `toolbar` component before each test
  beforeEach(module('components.toolbar'));

  beforeEach(function() {
    // Mock the authentication service
    mockAuthService = sinon.stub({
      isAuthenticated: false,
      checkToken: function() {}
    });

    module(function($provide) {
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
    }));

    it('should update local isAuthenticated state when global state changes', function() {
      // Trigger Auth state change
      mockAuthService.isAuthenticated = true;
      $scope.$digest();

      expect(ctrl.isAuthenticated).to.equal(mockAuthService.isAuthenticated);
    });

  });

});