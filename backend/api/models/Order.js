/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    grandTotal: {
      type: 'float',
      defaultsTo: 0
    },
    items: {
      type: 'array',
      defaultsTo: []
    },
    stripeToken: {
      type: 'string',
      defaultsTo: ''
    },
    stripeTokenType: {
      type: 'string',
      defaultsTo: ''
    },
    stripeEmail: {
      type: 'string',
      defaultsTo: ''
    },
    stripeBillingName: {
      type: 'string',
      defaultsTo: ''
    },
    stripeBillingAddressCountry: {
      type: 'string',
      defaultsTo: ''
    },
    stripeBillingAddressCountryCode: {
      type: 'string',
      defaultsTo: ''
    },
    stripeBillingAddressZip: {
      type: 'integer',
      defaultsTo: 0
    },
    stripeBillingAddressLine1: {
      type: 'string',
      defaultsTo: ''
    },
    stripeBillingAddressCity: {
      type: 'string',
      defaultsTo: ''
    }
  }
};