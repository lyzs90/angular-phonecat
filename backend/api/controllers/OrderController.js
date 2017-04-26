/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  submitOrders: (req, res) => {
	sails.log.debug('Order received!');
	var order = req.body ? req.body : undefined;
	OrderService.addOrder(order, (success) => {
	  return res.redirect('http://localhost:8000/success');
	});
  }
};

