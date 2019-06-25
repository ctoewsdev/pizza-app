
$(function ready() {
    $("#submitForm").submit(function (event) {
        event.preventDefault();


        //VALIDATION 
        //Obtain search parameters from ADDBOX ids
        let formAddress = $('#address').val();
        let formTelephone = $('#telephone').val();

        //Validate address and telephone
        let valid = true;
        let validationErrMessage = "";
        let validateFormAddress = validateAddress(formAddress);
        let validateFormTelephone = validateTelephone(formTelephone);

        if (validateFormAddress == false) {
            validationErrMessage += " Address value is invalid (please only use alphanumeric, comma and hyphen)."
            valid = false;
        }
        if (validateFormTelephone == false) {
            validationErrMessage += " Telephone value is invalid (please use format 999-999-9999)."
            valid = false;
        }

        //Prevent AJAX POST call if address or telephone are NOT valid
        if (valid == false) {
            $('#statusMsg').html(validationErrMessage);
            window.scrollTo(0, findPos(document.getElementById("statusMsg")));
        }

        //Proceed with AJAX POST call if valid
        else {
            //assign cheese, meat and veggie values/arrays
            //and calculate toppings quantity
            let chargedToppingsTotal = 0;
            let cheese = [];
            if ($('input[name=cheese]:checked').val() == undefined) {
                cheese = "No cheese.";
            }
            else {
                $('input[name=cheese]:checked').each(function () {
                    cheese.push($(this).val());
                });
                if (cheese.length > 1) {
                    chargedToppingsTotal += (cheese.length - 1);
                }
            }

            let meat = [];
            if ($('input[name=meat]:checked').val() == undefined) {
                meat = "No meat.";
            }
            else {
                $('input[name=meat]:checked').each(function () {
                    meat.push($(this).val());
                });
                if (meat.length > 1) {
                    chargedToppingsTotal += (meat.length - 1);
                }
            }

            let veggie = [];
            if ($('input[name=veggie]:checked').val() == undefined) {
                veggie = "No veggie.";
            }
            else {
                $('input[name=veggie]:checked').each(function () {
                    veggie.push($(this).val());

                });
                if (veggie.length > 1) {
                    chargedToppingsTotal += (veggie.length - 1);
                }
            }

            //Obtain pizza price and size
            let pizzaElements = $('input[name=pizza]:checked').val();
            let pizza = pizzaElements.split(',')
            let pizzaSize = pizza[0];
            let pizzaPrice = pizza[1];


            //construct orderinfo for POST request
            let orderInfo = JSON.stringify({
                createdon: Date.now(),
                address: $('#address').val(),
                telephone: $('#telephone').val(),
                size: pizzaSize,
                price: pizzaPrice,
                quantity: $('#quantity').val(),
                crust: $('input[name=crust]:checked').val(),
                cheese: cheese,
                meat: meat,
                veggie: veggie,
                chargedtoppings: chargedToppingsTotal
            });

            console.log("Adding a new order: " + orderInfo)

            $.ajax({
                url: '/api/orders',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: orderInfo,
                success: function (json, status, request) {
                    $('#statusMsg').removeClass();
                    $('#statusMsg').addClass('alert alert-success');
                    $('#statusMsg').html('Your order has processed');
                    window.scrollTo(0, findPos(document.getElementById("statusMsg")));
                },
                error: function (request, status) {
                    $('#statusMsg').removeClass();
                    $('#statusMsg').addClass('alert alert-danger');
                    $('#statusMsg').html('Error processing your order');
                    window.scrollTo(0, findPos(document.getElementById("statusMsg")));
                    console.log('Request failed : ', status);
                }
            });

            //add delivery time function
            // <div class="menu">
            // <% if (typeof(deliveryTime) !== 'undefined') { %>
            //    <h2>Your estimated deliver time is at: <%= //deliveryTime %> </h2>
            //  <% } %>
            //  </div>

        }
    });
});


//Validation functions
function validateAddress(address) {
    if (address.match(/^[a-zA-Z0-9,\- ]+$/g)) {
        console.log("address is valid");
        return true;
    }
    else {
        console.log("address is NOT valid")
        return false;
    }
}

function validateTelephone(telephone) {
    if (telephone.match(/^([0-9]{3})-([0-9]{3})-([0-9]{4})$/)) {
        console.log("telphone is valid");
        return true;
    }
    else {
        console.log("telphone is NOT valid")
        return false;
    }
} 
