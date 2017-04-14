angular.
  module('common.phone').
  factory('PhoneService', PhoneService);

/**
 * @name PhoneService
 * @desc Service for retrieving phone catalog data
 * @ngInject
 */
function PhoneService($resource) {
  return {
    getPhones: getPhones
  };

  /**
   * @name resourceErrorHandler
   * @desc Funcion to handle error logging
   * @param {String} err
   * @returns {String}
   */
  function resourceErrorHandler(err) {
    console.log(err);
  }

  /**
   * @name getPhones
   * @desc Function to retrieve phone catalog data from backend API
   * @returns {Array}
   */
  function getPhones() {
    return $resource('http://localhost:1337/api/protected/phones/:phoneId', {}, {query: {
      method: 'GET',
      interceptor : {responseError : resourceErrorHandler},
      params: {phoneId: 'phones'},
      isArray: true
      }}
    );
  }
}
