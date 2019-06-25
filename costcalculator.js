class CostCalculator {

    constructor() {
        this.gst = .05;
        this.toppingPrice = .5;
    }
    getToppingsPrice(toppings) {
        return (toppings * this.toppingPrice) * 100;
    }

    calculateSubtotal(reqBody) {
        let sizecost = reqBody.price * 100;
        let toppingsCost = this.getToppingsPrice(reqBody.chargedtoppings);
        console.log("toppingcost: " + toppingsCost); 
        let quantity = reqBody.quantity;
        console.log("quantity: " + quantity); 
        let subtotal = (sizecost + toppingsCost) * quantity;
        console.log("subtotal:" + subtotal);
        return this.roundDecimals(subtotal) / 100;
    }
    calculateTax(subtotal) {
        return this.roundDecimals(subtotal * this.gst);
    }

    calculateTotalCost(subtotal, tax) {
        return this.roundDecimals(subtotal + tax);
    }

    roundDecimals(amount) {
        return parseFloat(Math.round(amount * 100) / 100).toFixed(2);
    }

}

module.exports = CostCalculator;