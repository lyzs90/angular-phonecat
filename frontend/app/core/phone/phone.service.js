'use strict';

angular.
  module('core.phone').
  factory('Phone', ['$resource',
    function($resource) {
      return $resource('http://localhost:1337/api/protected/phones/:phoneId', {}, {
        query: {
          method: 'GET',
          interceptor : {responseError : resourceErrorHandler},
          params: {phoneId: 'phones'},
          isArray: true
        }
      });
    }
  ]);

function resourceErrorHandler(err) {
  console.log(err)
}