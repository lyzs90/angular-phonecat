'use strict';

describe('Phone', function() {
  var $httpBackend;
  var Phone;
  var phonesData = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'}
  ];

  // Load the module that contains the `Phone` service before each test
  beforeEach(module('core.phone'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_, _Phone_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://localhost:1337/api/protected/phones/phones').respond(phonesData);

    Phone = _Phone_;
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
    
    var phones = Phone.getPhones().query();

    expect(angular.equals(phones, [])).to.be.true();

    $httpBackend.flush();
    expect(angular.equals(phones, phonesData)).to.be.true();
  });

});
