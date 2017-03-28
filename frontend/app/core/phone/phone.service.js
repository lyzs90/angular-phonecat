(function() {
  'use strict';

  angular.
    module('core.phone').
    factory('Phone', Phone);

  Phone.$inject = ['$resource'];

  function Phone($resource) {
    return {
      getPhones: getPhones
    };

    function resourceErrorHandler(err) {
      console.log(err);
    }

    function getPhones() {
      return $resource('http://localhost:1337/api/protected/phones/:phoneId', {}, {query: {
        method: 'GET',
        interceptor : {responseError : resourceErrorHandler},
        params: {phoneId: 'phones'},
        isArray: true
        }}
      )
    }
  }
})();
