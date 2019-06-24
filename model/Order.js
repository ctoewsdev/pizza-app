var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var orderSchema = new Schema({
    telephone: String,
    address: String,
    size: String,
    price: String,
    quantity: String,
    crust: String,
    cheese: String,
    meat: String,
    veggie: String,
    totalCost: String,
    createdOn: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);