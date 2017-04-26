module.exports = {
  addOrder: (order, next) => {
	Order.create(order).exec((err, order) => {
	  if(err) throw err;
	  next(order);	  
	});
  }
}