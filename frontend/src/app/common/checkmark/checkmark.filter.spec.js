'use strict';

describe('checkmarkFilter', function() {

  beforeEach(module('common.checkmark'));

  it('should convert boolean values to unicode checkmark or cross',
    inject(function(checkmarkFilter) {
      expect(checkmarkFilter(true)).to.equal('\u2713');
      expect(checkmarkFilter(false)).to.equal('\u2718');
    })
  );

});
