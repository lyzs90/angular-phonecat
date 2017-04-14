angular.
  module('common.checkmark').
  filter('checkmark', checkmark);

  /**
   * @name checkmark
   * @desc Filter to convert boolean values to unicode checkmark or cross
   * @ngInject
   */
  function checkmark() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  }

