'use strict';

describe('phoneDetail', function() {

  // Load the module that contains the `phoneDetail` component before each test
  beforeEach(module('components.phoneDetail'));

  // Test the controller
  describe('PhoneDetailController', function() {
    var $httpBackend, $componentController, ctrl;

    // Mock data to be fetched
    var xyzPhoneData = {
      name: 'phone xyz',
      images: ['image/url1.png', 'image/url2.png']
    };

    beforeEach(inject(function(_$componentController_, _$httpBackend_, $stateParams) {
      // Mock the backend
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://localhost:1337/api/protected/phones/xyz').respond(xyzPhoneData);

      // Mock the router state
      $stateParams.phoneId = 'xyz';

      // Mock the controller
      $componentController = _$componentController_;
      ctrl = $componentController('phoneDetail', null);
    }));

    it('should fetch the phone details', function() {
      expect(angular.equals(ctrl.phone, {})).to.be.true();

      $httpBackend.flush();
      expect(angular.equals(ctrl.phone, xyzPhoneData)).to.be.true();
    });

  });

});
