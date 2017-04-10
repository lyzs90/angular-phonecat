'use strict';

describe('PhoneService', function() {
  var $httpBackend;
  var PhoneService;
  var phonesData = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'}
  ];

  // Load the module that contains the `PhoneService` service before each test
  beforeEach(module('common.phone'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _PhoneService_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://localhost:1337/api/protected/phones/phones').respond(phonesData);

    PhoneService = _PhoneService_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the phones data from backend', function() {
    $httpBackend.when('GET', new RegExp('.*')).respond(function(method, url, data) {
      console.log('URL:', url);
    });
    
    var phones = PhoneService.getPhones().query();

    expect(angular.equals(phones, [])).to.be.true();

    $httpBackend.flush();
    expect(angular.equals(phones, phonesData)).to.be.true();
  });

});
