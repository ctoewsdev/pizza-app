$(function ready() {


    //Consume for entire collection of ordersList
    $.getJSON("/api/orders", function (data) {

        //set up header row
        $('#orders').append('<tr><td>Telephone</td><td>Address</td><td>Size</td><td>Price</td><td>Qty</td><td>Crust</td><td>Cheese</td><td>Meats</td><td>Veggies</td><td>Total</td></tr>');

        //process the full ordersList
        data.forEach(function (item) {
            $('#orders').append('<tr><td>' + item.telephone + '</td><td>' + item.address + '</td><td>' + item.size + '</td><td>' + item.price + '</td><td>' + item.quantity + '</td><td>' + item.crust + '</td><td>' + item.cheese + '</td><td>' + item.meat + '</td><td>' + item.veggie + '</td><td>' + item.totalCost + '</td></tr>');
        });
    });

    //Consume for searching orders by telephone and/or address    
    $('#search').click(function(){ 
        
        //Obtain search parameters from searchbox ids
        let searchTelephone = document.getElementById("searchTelephone").value;
        let searchAddress = document.getElementById("searchAddress").value;

        //Get validation values
        let valid = true;
        let validationErrMessage = "";
        let validateSearchAddress = validateAddress(searchAddress);
        let validateSearchTelephone = validateTelephone(searchTelephone);

         //Check if a value is invalid, and load message
         if (validateSearchTelephone == false)
         {
             validationErrMessage  += " Telephone search value is invalid (please use format 999-999-9999)."
             valid = false;
         }
         if (validateSearchAddress == false)
         {
             validationErrMessage  += " Address search value is invalid (please only use alphanumeric, comma and hyphen)."
             valid = false;
         }
         

        //Check if values are empty, and display message
        if (searchTelephone == "" && searchAddress == ""){
            $('#searchResultTitle').html("Please enter search values");
            $('#searchResults').html('');  
        }

        //Prevent AJAX search if adddress or telehone are NOT valid
        else if (valid == false){
            $('#searchResultTitle').html(validationErrMessage);
            $('#searchedOrders').html(''); 
        }

         //construct the search data for the Ajax call
        else {
            console.log("search data value in AJAX is: tele" + searchTelephone + " and add: " +searchAddress);

            let searchData = {
                telephone : searchTelephone,
                address : searchAddress
            };

           
            
            $.ajax({  
                url:'/api/orders/search',  
                type:'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                data: searchData,  
                success: function(data) { 
                    
                    //if there is not match
                    if (data < 1) {
                        $('#searchResultTitle').html('No match!');
                        $('#searchedOrders').html('');                 
                    }
                    //processSearchResult(data);
                    else {                
                        //set up header row
                        $('#searchResultTitle').append('<h1>Search Results</h1>');
                        $('#searchedOrders').append('<tr><td>Telephone</td><td>Address</td><td>Size</td><td>Price</td><td>Qty</td><td>Crust</td><td>Cheese</td><td>Meats</td><td>Veggies</td><td>Total</td></tr>');
                        //dispaly results in table
                        data.forEach(function (item) {
                            $('#searchedOrders').append('<tr><td>' + item.telephone + '</td><td>' + item.address + '</td><td>' + item.size + '</td><td>' + item.price + '</td><td>' + item.quantity + '</td><td>' + item.crust + '</td><td>' + item.cheese + '</td><td>' + item.meat + '</td><td>' + item.veggie + '</td><td>' + item.totalCost + '</td></tr>');
                        });
                    }
                }  
            });  
        }        
    });  
}); 

//VALIDATION FUNCTIONS

function is(data){
    if(data == ""){
        console.log("search data " + data + " is empty");
        let emptyMessage = "emptyEntry";
        return emptyMessage;
    }
    else if (data.match(/^[a-zA-Z0-9\., ]+$/g)){
        console.log("search data " + data + " did validate");
        return true;
        
    }
    else{
        console.log("search data " + data + " did not validate");
        return false;
    }
}


//Validation functions
function validateAddress(address){
    if(address == ""){
        return;
    }
    else if (address.match(/^[a-zA-Z0-9,\- ]+$/g)){
        console.log("address search value is valid");
        return true;
    }
    else{
        console.log("address search value is NOT valid")
        return false;
    }
}

function validateTelephone(telephone)  {    
    if(telephone == ""){
        return;
    }
    else if(telephone.match(/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/)){ 
        console.log("telphone search value is valid");  
       return true;        
     }  
    else {  
        console.log("telphone search value is NOT valid")
       return false;  
     }  
} 
