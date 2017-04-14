'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('PhoneCat Application', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  describe('View: Home', function() {

    it('should not display any content before authentication', function() {
      expect(element(by.tagName('h3')).getText()).toBe('Login from the toolbar above!');
    });

    it('should display view catalog button after authentication', function() {
       // Open the Auth0 lock widget
       element(by.css('.toolbar__loginBtn')).click();

       // Check if modal has been successfully loaded
       var emailInputExists = element(by.css('input[name=email]'));
       browser.wait(function() {
         return emailInputExists.isPresent();
       }, 5000);

       // Wait for modal fields to be displayed (they are on the page but might be hidden initially)
       browser.sleep(2000);

       // Enter credentials
       var emailInput = element(by.css('input[name=email]'));
       var passwordInput = element(by.css('input[name=password]'));
       emailInput.sendKeys('tester@test.com');
       passwordInput.sendKeys('test');

       // Click Auth0-lock login button
       var auth0Login = element(by.css('.auth0-lock-submit'));
       auth0Login.click();

       // Wait for user to be authenticated before checking expectation
       browser.sleep(6000);

       // Can't click on Auth0-lock close button, so just do a redirect
       browser.get('index.html');

       browser.sleep(2000);

       expect(element(by.tagName('h3')).getText()).toBe('You are now logged in!');
    });

  });

  describe('View: Phone list', function() {

    beforeEach(function() {
      // Click catalog button
      element(by.css('.home__catalogBtn')).click();

      // Wait for data to be loaded
      browser.sleep(2000);
    });

    it('should filter the phone list as a user types into the search box', function() {
      var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
      var query = element(by.model('$ctrl.query'));

      expect(phoneList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(8);
    });

    it('should be possible to control phone order via the drop-down menu', function() {
      var queryField = element(by.model('$ctrl.query'));
      var orderSelect = element(by.model('$ctrl.orderProp'));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));
      var phoneNameColumn = element.all(by.repeater('phone in $ctrl.phones').column('phone.name'));

      function getNames() {
        return phoneNameColumn.map(function(elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys('tablet');   // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        'Motorola XOOM\u2122 with Wi-Fi',
        'MOTOROLA XOOM\u2122'
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        'MOTOROLA XOOM\u2122',
        'Motorola XOOM\u2122 with Wi-Fi'
      ]);
    });

    it('should render phone specific links', function() {
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('nexus');

      element.all(by.css('.phones li a')).first().click();
      expect(browser.getLocationAbsUrl()).toBe('/phone/nexus-s');
    });

  });

  describe('View: Phone detail', function() {

    beforeEach(function() {
      // Click catalog button
      element(by.css('.home__catalogBtn')).click();

      // Wait for data to be loaded
      browser.sleep(2000);

      // Select Nexus S
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('nexus');

      // Wait for data to be loaded
      browser.sleep(1000);

      element.all(by.css('.phones li a')).first().click();
    });

    it('should display the `nexus-s` page', function() {
      expect(element(by.binding('$ctrl.phone.name')).getText()).toBe('Nexus S');
    });

    it('should display the first phone image as the main phone image', function() {
      var mainImage = element(by.css('img.phone.selected'));

      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });

    it('should swap the main image when clicking on a thumbnail image', function() {
      var mainImage = element(by.css('img.phone.selected'));
      var thumbnails = element.all(by.css('.phone-thumbs img'));

      thumbnails.get(2).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

      thumbnails.get(0).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });

  });

});
