/**
 * validateOrder
 */

const dbPhones = require('../services/phones/phones.json');

module.exports = function validateOrder(req, res, next) {
  sails.log.debug('Order received!');

  const order = req.body ? req.body : undefined;
  const items = JSON.parse(req.body.items);
  const grandTotal = req.body.grandTotal;

  let dbTotal = 0;

  for (let item of items) {
    let dbItem = _.find(dbPhones, { 'id': item.id });
    dbTotal += dbItem.price; 
  }

  const dbGrandTotal = (dbTotal * 1.05).toFixed(2);  // include delivery

  // If order is validated against DB, proceed to next policy or controller
  if (dbGrandTotal === grandTotal) {
    sails.log.debug('Order validated!');
    return next();
  }

  // Else return forbidden page
  return res.forbidden('Order has been tampered with on the client-side.');
};
