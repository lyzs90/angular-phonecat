(function() {
  'use strict';

  angular.
    module('components.cart').
    factory('CartService', CartService);

  /**
   * @name CartService
   * @desc Service for persisting cart state and provides methods to add/remove * items from cart
   * @ngInject
   */
  function CartService() {
    var service = {
      items: [],
      addItem: addItem,
      removeItem: removeItem,
      getTotal: getTotal
    };

    return service;

    /**
     * @name addItem
     * @desc Add item to cart
     */
    function addItem(item) {
      service.items = [
        ...service.items,
        item
      ];
    }

    /**
     * @name removeItem
     * @desc Remove item from cart
     */
    function removeItem(id) {
      var i = service.items.findIndex(_hasId(id));
      service.items = [
        ...service.items.slice(0, i),  // everything before the item to delete
        ...service.items.slice(i + 1)  // everything after the item to delete
      ];
    }

    /**
     * @name _hasId
     * @desc Helper function for removeItem
     */
    function _hasId(id) {
      return function (item) {
        return item.id === id;
      };
    }

    /**
     * @name getTotal
     * @desc Calculate total cost of items in cart
     */
    function getTotal() {
      var total = 0;
      for (var item of service.items) {
        total += item.price;
      }
      return total;
    }

  }
})();