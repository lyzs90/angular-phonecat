angular.
  module('common.cart').
  factory('CartService', CartService);

/**
 * @name CartService
 * @desc Service for persisting cart state and provides methods to add/remove * items from cart
 * @ngInject
 */
function CartService(store) {
  var items = [];

  var service = {
    items: items,
    addItem: addItem,
    removeItem: removeItem,
    removeAllItems: removeAllItems,
    getTotal: getTotal,
    getCount: getCount,
    getItems: getItems
  };

  return service;

  /**
   * @name getItems
   * @desc Check localstorage for cart items. If user is the same, then        * retrieve items
   */
  function getItems() {
    var profile = JSON.parse(store.get('profile')) || {};
    var cart = store.get('cart|' + profile.user_id);
    if (cart !== null && cart.items && cart.userId === profile.user_id) {
     service.items = cart.items;
    }
  }

  /**
   * @name addItem
   * @desc Add item to cart, persist items state to localstorage
   */
  function addItem(item) {
    var profile = JSON.parse(store.get('profile'));
    service.items = [
      ...service.items,
      item
    ];
    
    if (profile !== null && service !== null) {
      store.set('cart|' + profile.user_id, {userId: profile.user_id, items: service.items});
    }
  }

  /**
   * @name removeItem
   * @desc Remove item from cart, persist items state to localstorage
   */
  function removeItem(id) {
    var profile = JSON.parse(store.get('profile'));
    var i = service.items.findIndex(_hasId(id));
    service.items = [
      ...service.items.slice(0, i),  // everything before the item to delete
      ...service.items.slice(i + 1)  // everything after the item to delete
    ];

    if (profile !== null && service !== null) {
      store.set('cart|' + profile.user_id, {userId: profile.user_id, items: service.items});
    }
  }

  /**
   * @name removeAllItems
   * @desc Remove all items from cart and delete state from localstorage
   */
  function removeAllItems() {
    var profile = JSON.parse(store.get('profile'));
    store.remove('cart|' + profile.user_id);
    service.items = [];
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

  /**
   * @name getCount
   * @desc Count the number of items in cart
   */
  function getCount() {
    getItems();
    return service.items.length;
  }

}
