module.exports = {
  addOrder: (order, next) => {
	Order.create(order)
		.then((order) => {
			next(order);
		})
		.catch((err) => {
			throw err;
		});
  }
};
