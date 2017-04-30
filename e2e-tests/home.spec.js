'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('PhoneCat Application', function() {

  beforeEach(function() {
    browser.get('index.html');

    browser.sleep(2000);
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

});
