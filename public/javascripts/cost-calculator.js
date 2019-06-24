class CostCalculator {

    constructor () {
        this.gst = 0.5;
    }

    calculateCostByQty(pizzaCost, qty, chargedToppingsTotal) {
        const tax = 1.12;
        //let totalCost = 0;
        let toppingCost = 0;

        console.log("inside cost calc toppings are " +chargedToppingsTotal);

        //calculate toppings cost
        if(chargedToppingsTotal > 0){
            toppingCost = chargedToppingsTotal * .50;
        }

        console.log("inside cost calc toppingcost " +toppingCost);

        //calculate pizza cost
        let pizzaAndToppings = parseInt(pizzaCost) + parseInt(toppingCost);
        let totalCost = (pizzaAndToppings * qty) * tax;
        //let byTax = byQuantity * tax;
        //totalCost = ((pizzaCost + toppingCost) * qty) * tax;
        let cost =  parseFloat(Math.round(totalCost * 100) / 100).toFixed(2);   

        // console.log("inside cost calc just pizz " +pizzaCost);
        // console.log("inside cost calc piza and toppings " +pizzaAndToppings);
        // console.log("inside cost calc pizzabyqty " +byQuantity);console.log("inside cost calc byTax " +byTax);
        // console.log("inside cost calc topping cost " +toppingCost);
        // console.log("inside cost calc totalCost " +totalCost);
        // console.log("inside cost calc cost " +cost);

        return cost;
    };

}
module.exports = CostCalculator;