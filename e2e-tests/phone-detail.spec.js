'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('PhoneCat Application', function() {

  beforeEach(function() {
    browser.setLocation('phones');
  });

  describe('View: Phone detail', function() {

    beforeEach(function() {
      // Select Nexus S
      var query = element(by.model('$ctrl.query'));
      query.sendKeys('dell');

      // Wait for data to be loaded
      browser.sleep(1000);

      element.all(by.css('.phones li a')).first().click();
    });

    it('should display the `dell-streak-7` page', function() {
      expect(element(by.binding('$ctrl.phone.name')).getText()).toBe('Dell Streak 7');
    });

    it('should display the first phone image as the main phone image', function() {
      var mainImage = element(by.css('img.phone.selected'));

      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/dell-streak-7.0.jpg/);
    });

    it('should swap the main image when clicking on a thumbnail image', function() {
      var mainImage = element(by.css('img.phone.selected'));
      var thumbnails = element.all(by.css('.phone-thumbs img'));

      thumbnails.get(2).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/dell-streak-7.2.jpg/);

      thumbnails.get(0).click();
      expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/dell-streak-7.0.jpg/);
    });

  });

});
