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
      defaultsTo: 0,
      required: true,
      float: true,
      notNull: true
    },
    items: {
      type: 'string',
      defaultsTo: '',
      required: true,
      notNull: true
    },
    stripeToken: {
      type: 'string',
      defaultsTo: '',
      required: true,
      notNull: true
    },
    stripeTokenType: {
      type: 'string',
      defaultsTo: '',
      required: true,
      notNull: true
    },
    stripeEmail: {
      type: 'string',
      defaultsTo: '',
      required: true,
      email: true,
      notNull: true
    },
    stripeBillingName: {
      type: 'string',
      defaultsTo: '',
      required: true,
      notNull: true
    },
    stripeBillingAddressCountry: {
      type: 'string',
      defaultsTo: '',
      required: true,
      notNull: true
    },
    stripeBillingAddressCountryCode: {
      type: 'string',
      defaultsTo: '',
      required: true,
      notNull: true
    },
    stripeBillingAddressZip: {
      type: 'integer',
      defaultsTo: 0,
      required: true,
      notNull: true
    },
    stripeBillingAddressLine1: {
      type: 'string',
      defaultsTo: '',
      required: true,
      notNull: true
    },
    stripeBillingAddressCity: {
      type: 'string',
      defaultsTo: '',
      required: true,
      notNull: true
    }
  }
};