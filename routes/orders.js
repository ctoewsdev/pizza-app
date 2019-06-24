let express = require('express');
let Order = require('../model/Order');
const orderFormValues = require('../orderFormValues');

const CostCalculator = require('../public/javascripts/CostCalculator');
const calculator = new CostCalculator();

let router = express.Router();

router.get('/', function(req, res){ //
    res.render('order',  {
        title : "Order", 
        message : "Please place your order.",
        address:orderFormValues.address, 
        telephone : "", 
        quantity : "1",
        pizzas:orderFormValues.pizzas, 
        crusts:orderFormValues.crusts,
        cheeses:orderFormValues.cheeses, 
        meats:orderFormValues.meats, 
        veggies:orderFormValues.veggies});
    });

router.get('/ordersList', function(req, res){ 
    res.render('ordersList', {
        title : "OrdersList", 
        message : "Current List of All Orders."
    });
    console.log("router has rendered orders list page")
});

//REST (API) Endpoints
router.get('/api/orders', function(req, res){ 
    Order.find({}, function(err, orders) { 
        res.json(orders);
        console.log("This is the API GET endpoint router")
    });    
});

router.get('/api/orders/search', function(req, res){ 
    console.log("inside the Search api router")
    let telephone = req.query.telephone;
    console.log("tele search api = " + telephone)
    let address = req.query.address;
    console.log("addy search api  = " + address);
    console.log("addy search api length  = " + address.length);

    //construct search query based on passed parameters 
    let search;  
    if (telephone.length > 0 && address.length > 0){
        search = {telephone:telephone, address:address};
        console.log("search 1 in api")
    }
    if (telephone.length == 0 && address.length > 0){
        search = {address:address};
        console.log("search 2 in api")
    }
    if (address.length == 0 && telephone.length > 0){
        search = {telephone:telephone};
        console.log("search 3 in api")
    }

    Order.find(search, function(err, searchResult) { 
        res.json(searchResult);
        console.log("This is the SEARCH API endpoint router result" + searchResult)
    });    
});

router.post('/api/orders', function(req, res){
    var order = new Order(req.body);    

    //calculate total cost and add to order
    let toppings = req.body.toppings;
    console.log("toppings" + toppings)
    order.totalCost = calculator.calculateCostByQty(order.price, order.quantity, toppings);

    //Post order to database
    order.save(function(err){
        if (err) {
            console.log("Error : ", err);
            res.status(500).json({status: "Failed to add the order"});
            return;
        }
        res.json({status : "Successfully added an order"});
    });          
});

module.exports = router;
