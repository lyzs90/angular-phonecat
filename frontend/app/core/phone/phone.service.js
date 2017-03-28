(function() {
  'use strict';

  angular.
    module('core.phone').
    factory('Phone', Phone);

  Phone.$inject = ['$resource', '$q'];

  function Phone($resource, $q) {
    return {
      getPhones: getPhones
    };

    function resourceErrorHandler(err) {
      console.log(err);
    }

    function delay(ms) {
      return function(value) {
        return $q(function(resolve, reject) {
          setTimeout(function() {
            resolve(value);
          }, ms);
        });
      };
    }

    function getPhones() {
      return $resource('http://localhost:1337/api/protected/phones/:phoneId', {}, {query: {
        method: 'GET',
        interceptor : {responseError : resourceErrorHandler},
        params: {phoneId: 'phones'},
        isArray: true
        }}
      )
        .query()
        .$promise
        .then(delay(3000));
    }
  }
})();
