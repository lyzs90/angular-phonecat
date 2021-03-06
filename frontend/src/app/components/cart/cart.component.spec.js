'use strict';

describe('cart', function() {
  var mockAuthService, mockStore, $componentController, $scope, ctrl;

  // Mock data to be fetched
  var userProfile = {
    nickname: 'userNickname',
    email: 'userEmail'
  };

  // Load the module that contains the `cart` component before each test
  beforeEach(module('components.cart'));

  beforeEach(function() {
    // Mock the authentication service
    mockAuthService = sinon.stub({
      checkToken: function() {}
    });

    module(function($provide) {
      $provide.value('AuthService', mockAuthService);
    });
  });

  // Mock the store service
  mockStore = {
    get: function() {return userProfile;}
  };

  // Test the controller
  describe('CartController', function() {
    beforeEach(inject(function(_$componentController_, $rootScope) {
      // Mock the controller
      $scope = $rootScope.$new();
      $componentController = _$componentController_;
      ctrl = $componentController('cart', {$scope: $scope});
      ctrl.$onInit();
    }));

    it('should retrieve user profile from localstorage', function() {
      ctrl.profile = mockStore.get();
      expect(ctrl.profile).to.equal(userProfile);
    });

  });

});