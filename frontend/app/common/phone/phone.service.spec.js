'use strict';

describe('PhoneService', function() {
  var $httpBackend, PhoneService, response;

  // Mock data to be fetched
  var phoneList = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'}
  ];

  var xyzDetails = {
    name: 'phone xyz',
    images: ['image/url1.png', 'image/url2.png']
  };

  // Load the module that contains the `PhoneService` service before each test
  beforeEach(module('common.phone'));

  // Instantiate the service and `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _PhoneService_) {
    $httpBackend = _$httpBackend_;
    PhoneService = _PhoneService_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the phone list from backend', function() {
    $httpBackend.expectGET('http://localhost:1337/api/protected/phones/phones').respond(phoneList);
    
    response = PhoneService.getPhones().query();

    expect(angular.equals(response, [])).to.be.true();
    
    $httpBackend.flush();
    
    expect(angular.equals(response, phoneList)).to.be.true();
  });

  it('should fetch the phone details from backend', function() {
    $httpBackend.expectGET('http://localhost:1337/api/protected/phones/xyz').respond(xyzDetails);

    response = undefined;
    
    expect(angular.equals(response, undefined)).to.be.true();

    PhoneService.getPhones().get({phoneId: 'xyz'}, function(data) {
      response = data;
    });
    
    $httpBackend.flush();

    expect(angular.equals(response, xyzDetails)).to.be.true();
  });

});
