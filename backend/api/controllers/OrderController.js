/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  submitOrders: (req, res) => {
		const order = req.body ? req.body : undefined;

		OrderService.addOrder(order, (order) => {
			sails.log.debug('Order added to DB!');

			OrderService.chargeOrder(order, () => {
				sails.log.debug('Charge successful!');
				return res.redirect('http://localhost:8000/success');
			});
		});
	}
};

