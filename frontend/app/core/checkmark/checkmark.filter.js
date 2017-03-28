(function() {
  'use strict';

  angular.
    module('core').
    filter('checkmark', checkmark);

    function checkmark() {
      return function(input) {
        return input ? '\u2713' : '\u2718';
      };
    }
})();

