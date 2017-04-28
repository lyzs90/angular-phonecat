const stripe = require('stripe')('sk_test_45X6QG4pfHGByo0bNK1aPjWI');

module.exports = {
  addOrder: (order, next) => {
		Order.create(order)
		.then((order) => {
			next(order);  // pass order object to next middleware i.e. chargeOrder
		})
		.catch((err) => {
			throw err;
		});
  },
	chargeOrder: (order, next) => {
		// Get the payment details submitted by Stripe Checkout
		const source = order.stripeToken;
		const amount = order.grandTotal;
		const description = order.items;

		// Charge the user's card
		const charge = stripe.charges.create({
			amount: parseInt(amount * 100),
			currency: 'sgd',
			description,
			source
		}, (err, charge) => {
			if (err) {
				throw err;
			} else {
				next();
			}
		});
	}
};
