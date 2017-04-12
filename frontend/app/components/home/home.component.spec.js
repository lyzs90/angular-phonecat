'use strict';

describe('home', function() {
  var mockAuthService, $componentController, $scope, ctrl;

  // Load the module that contains the `home` component before each test
  beforeEach(module('components.home'));

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
  describe('HomeController', function() {
    beforeEach(inject(function(_$componentController_, $rootScope) {
      // Mock the controller
      $scope = $rootScope.$new();
      $componentController = _$componentController_;
      ctrl = $componentController('home', {$scope: $scope});
    }));

    it('should update local isAuthenticated state when global state changes', function() {
      // Trigger Auth state change
      mockAuthService.isAuthenticated = true;
      $scope.$digest();

      expect(ctrl.isAuthenticated).to.equal(mockAuthService.isAuthenticated);
    });

  });

});