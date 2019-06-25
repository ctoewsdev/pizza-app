var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var orderSchema = new Schema({
    telephone: String,
    address: String,
    size: String,
    price: Number,
    quantity: Number,
    crust: String,
    cheese: String,
    meat: Array,
    veggie: Array,
    subtotal: Number,
    tax: Number,
    totalcost: Number,
    chargedtoppings: Number,
    createdon: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
