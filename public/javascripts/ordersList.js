$(function ready() {

    //Consume for entire collection of ordersList
    $.getJSON("/api/orders", function (data) {

        //header row    
        let htmllistheader =
            '<tr>\
                <td>\
                    Order\
                </td>\
                <td>\
                    Customer\
                </td>\
                <td>\
                    Pizza\
                </td>\
                <td>\
                    Toppings\
                </td>\
                <td>\
                    Cost\
                </td>\
            </tr>';

        $('#orders').append(htmllistheader);

        data.forEach(function (item) {
            date = new Date(item.createdon);

            let htmllistbody =
                '<tr>\
                <td>\
                    <ul>\
                        <li><strong>Date:</strong> ' + date.toDateString() + '</li>\
                    </ul>\
                 </td>\
                <td>\
                    <ul>\
                        <li><strong>Phone:</strong> ' + item.telephone + '</li>\
                        <li><strong>Address:</strong> ' + item.address + '</li>\
                    </ul>\
                </td>\
                <td>\
                    <ul>\
                        <li><strong>Size:</strong> ' + item.size + '</li>\
                        <li><strong>Price:</strong> $' + item.price + '</li>\
                        <li><strong>Crust:</strong> ' + item.crust + '</li>\
                        <li><strong>Quantity:</strong> ' + item.quantity + '</li>\
                    </ul>\
                </td>\
                <td>\
                    <ul>\
                        <li><strong>Cheese:</strong> ' + item.cheese + '</li>\
                        <li><strong>Meat:</strong> ' + item.meat + '</li>\
                        <li><strong>Veggie:</strong> ' + item.veggie + '</li>\
                    </ul>\
                </td>\
                <td>\
                    <ul>\
                        <li><strong>Subtotal:</strong> $' + item.subtotal + '</li>\
                        <li><strong>Tax:</strong> $' + item.tax + '</li>\
                        <li><strong>Total:</strong> $' + item.totalcost + '</li>\
                    </ul>\
                </td>\
            </tr>';

            $('#orders').append(htmllistbody);
        });
    });

    //Consume for searching orders by telephone and/or address      
    $('#search').click(function () {

        //clear previous search values
        $("#searchResultTitle").empty();
        $("#searchedOrders").empty();

        //Obtain search parameters from searchbox ids
        let searchTelephone = document.getElementById("searchTelephone").value;
        let searchAddress = document.getElementById("searchAddress").value;

        //Get validation values
        let valid = true;
        let validationErrMessage = "";
        let validateSearchAddress = validateAddress(searchAddress);
        let validateSearchTelephone = validateTelephone(searchTelephone);


        //Check if values are empty, and display message
        if (searchTelephone == "" && searchAddress == "") {
            $('#searchResultTitle').html("Please enter search values");
            $('#searchedOrders').html('');
        }

        //Prevent AJAX search if adddress or telehone are NOT valid
        else if (valid == false) {
            $('#searchResultTitle').html(validationErrMessage);
            $('#searchedOrders').html('');
        }

        //construct the search data for the Ajax call
        else {
            console.log("search data value in AJAX is: tele" + searchTelephone + " and add: " + searchAddress);

            let searchData = {
                telephone: searchTelephone,
                address: searchAddress
            };


            $.ajax({
                url: '/api/orders/search',
                type: 'GET',
                contentType: 'application/json',
                dataType: 'JSON',
                data: searchData,
                success: function (data) {

                    //if there is not match
                    if (data < 1) {
                        $('#searchResultTitle').html('No match!');
                        $('#searchedOrders').html('');
                    }
                    //processSearchResult(data);
                    else {
                        //set up header row
                        $('#searchResultTitle').append('<h1>Search Results</h1>');
                        //header row    
                        let htmllistheader =
                            '<tr>\
                                <td>\
                                    Order\
                                </td>\
                                <td>\
                                    Customer\
                                </td>\
                                <td>\
                                    Pizza\
                                </td>\
                                <td>\
                                    Toppings\
                                </td>\
                                <td>\
                                    Cost\
                                </td>\
                            </tr>';
                        $('#searchedOrders').append(htmllistheader);

                        //dispaly results in table
                        data.forEach(function (item) {
                            date = new Date(item.createdon);

                            let htmllistbody =
                                '<tr>\
                                    <td>\
                                        <ul>\
                                            <li><strong>Date:</strong> ' + date.toDateString() + '</li>\
                                        </ul>\
                                        </td>\
                                    <td>\
                                        <ul>\
                                            <li><strong>Phone:</strong> ' + item.telephone + '</li>\
                                            <li><strong>Address:</strong> ' + item.address + '</li>\
                                        </ul>\
                                    </td>\
                                    <td>\
                                        <ul>\
                                            <li><strong>Size:</strong> ' + item.size + '</li>\
                                            <li><strong>Price:</strong> $' + item.price + '</li>\
                                            <li><strong>Crust:</strong> ' + item.crust + '</li>\
                                            <li><strong>Quantity:</strong> ' + item.quantity + '</li>\
                                        </ul>\
                                    </td>\
                                    <td>\
                                        <ul>\
                                            <li><strong>Cheese:</strong> ' + item.cheese + '</li>\
                                            <li><strong>Meat:</strong> ' + item.meat + '</li>\
                                            <li><strong>Veggie:</strong> ' + item.veggie + '</li>\
                                        </ul>\
                                    </td>\
                                    <td>\
                                        <ul>\
                                            <li><strong>Subtotal:</strong> $' + item.subtotal + '</li>\
                                            <li><strong>Tax:</strong> $' + item.tax + '</li>\
                                            <li><strong>Total:</strong> $' + item.totalcost + '</li>\
                                        </ul>\
                                    </td>\
                                </tr>';
                            $('#searchedOrders').append(htmllistbody);
                        });
                    }
                }
            });
        }
    });
});

//VALIDATION FUNCTIONS
function is(data) {
    if (data == "") {
        console.log("search data " + data + " is empty");
        let emptyMessage = "emptyEntry";
        return emptyMessage;
    }
    else if (data.match(/^[a-zA-Z0-9\., ]+$/g)) {
        console.log("search data " + data + " did validate");
        return true;

    }
    else {
        console.log("search data " + data + " did not validate");
        return false;
    }
}

function validateAddress(address) {
    if (address == "") {
        return;
    }
    else if (address.match(/^[a-zA-Z0-9,\- ]+$/g)) {
        console.log("address search value is valid");
        return true;
    }
    else {
        console.log("address search value is NOT valid")
        return false;
    }
}

function validateTelephone(telephone) {
    if (telephone == "") {
        return;
    }
    else if (telephone.match(/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/)) {
        console.log("telphone search value is valid");
        return true;
    }
    else {
        console.log("telphone search value is NOT valid")
        return false;
    }
} 
