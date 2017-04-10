'use strict';

describe('phoneList', function() {
  var mockAuthService, mockSpinnerService;

  // Load the module that contains the `phoneList` component before each test
  beforeEach(module('components.phoneList'));

  beforeEach(function() {
    // Mock the authentication
    mockAuthService = sinon.stub({
      isAuthenticated: false
    });

    // Mock the spinner
    mockSpinnerService = sinon.stub({
      show: function() {}, 
      hide: function() {}
    });
    
    module(function($provide) {
      $provide.value('AuthService', mockAuthService);
      $provide.value('spinnerService', mockSpinnerService);
    });
  });

  // Test the controller
  describe('PhoneListController', function() {
    var $httpBackend, $componentController, $scope, ctrl;

    beforeEach(inject(function(_$httpBackend_, _$componentController_, $rootScope) {
      // Mock the backend
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost:1337/api/protected/phones/phones').respond(true);
      
      // Mock the controller
      $scope = $rootScope.$new();
      $componentController = _$componentController_;
      ctrl = $componentController('phoneList', {$scope: $scope});
    }));

    it('should call spinner when fetching data', function() {
      ctrl.getPhones();
      assert(mockSpinnerService.show.calledOnce);
    });

    it('should check that data is fetched once user is authenticated', function() {
      // simulate Auth state change
      mockAuthService.isAuthenticated = true;
      $scope.$digest();

      assert(mockSpinnerService.show.calledOnce);
    });

    it('should set a default value for the `orderProp` property', function() {
      expect(angular.equals(ctrl.orderProp, 'age')).to.be.true();
    });

  });

});
