// generate new order id
function generateOrderId() {

    if (orderTable.length == 0) {
        $('#txtOrderId').val("OR-001");
    } else {
        let lastOrderId = orderTable[orderTable.length - 1].getOrderId();
        let newId = Number.parseInt(lastOrderId.substring(3, 6)) + 1;
        if (newId < 10) {
            newId = "OR-00" + newId;
        } else if (newId < 100) {
            newId = "OR-0" + newId;
        }
        $('#txtOrderId').val(newId);
    }
}

//generate date
function generateDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    $("#txtDate").val(today);
}

// load customerId to combo and change values when selecting
function loadCustomerId() {
    let allCustomers = customerTable;
    let count = 0;
    $('#cmbCustomerId').children().remove();
    $('#cmbCustomerId').append("<option>--Select--</option>");
    $($('#cmbCustomerId').children().get(0)).attr('selected', 'true');
    $($('#cmbCustomerId').children().get(0)).attr('disabled', 'true');

    allCustomers.forEach(function () {
        $('#cmbCustomerId').append("<option>" + allCustomers[count].getCustomerID() + "</option>");
        count++;
    });
    $('#cmbCustomerId').on('change', function () {
        for (var i in allCustomers) {
            if ($('#cmbCustomerId :selected').val() === allCustomers[i].getCustomerID()) {
                $('#txtCustomerId').val(allCustomers[i].getCustomerID());
                $('#txtCustomerName').val(allCustomers[i].getCustomerName());
                $('#txtCustomerAddress').val(allCustomers[i].getCustomerAddress());
                $('#txtCustomerSalary').val(allCustomers[i].getCustomerSalary());
            }
        }
    });
}

// load Item to combo and change values when selecting
function loadItemCode() {
    let allItems = itemTable;
    let count = 0;
    $('#cmbItemCode').children().remove();
    $('#cmbItemCode').append("<option>--Select--</option>");
    $($('#cmbItemCode').children().get(0)).attr('selected', 'true');
    $($('#cmbItemCode').children().get(0)).attr('disabled', 'true');

    allItems.forEach(function () {
        $('#cmbItemCode').append("<option>" + allItems[count].getCode() + "</option>");
        count++;
    });
    $('#cmbItemCode').on('change', function () {
        for (var i in allItems) {
            if ($('#cmbItemCode :selected').val() === allItems[i].getCode()) {
                $('#txtItemCode').val(allItems[i].getCode());
                $('#txtDescription').val(allItems[i].getDescription());
                $('#txtQtyOnHand').val(allItems[i].getQTY());
                $('#txtUnitPrice').val(allItems[i].getPrice());
            }
        }
    });
}


//Place order
$('#btnPlaceOrder').click(function () {
    let orderDate = $('#txtDate').val();
    let cusId = $('#txtCustomerId').val();

    let orderDetails = [];
    let orderId = $('#txtOrderId').val();

    if ($('#txtCustomerId').val() !== "") {
        if (!$('#tblCart').is(':empty')) {
            $('#tblCart>tr').each(function () {
                orderDetails.push(new OrderDetails(
                    orderId,
                    $($(this).children().get(0)).text(),
                    $($(this).children().get(3)).text(),
                    $($(this).children().get(2)).text(),
                ));
            });
            let discount = $('#txtDiscount').val();
            let orderDTO = new OrderDTO(orderId, orderDate, cusId, orderDetails, discount);
            orderTable.push(orderDTO);

            alert("Order Placed..!");
            clearFields();
            loadCustomerId();
            loadItemCode()
            generateOrderId();
            generateDate();
            disablePlaceOrder();
            disableAddToCart();
        } else {
            alert("Cart Is Empty..!");
            disablePlaceOrder();
        }
    } else {
        alert("Please Select Customer..!");
        $('#cmbCustomerId').focus();
    }

});

// add to cart
$('#btnAddToCart').click(function () {
    let itemCode = $('#txtItemCode').val();
    let description = $('#txtDescription').val();
    let orderQty = $('#txtOrderQTY').val();
    let unitPrice = $('#txtUnitPrice').val();
    let total = $('#txtUnitPrice').val() * $('#txtOrderQTY').val();

    let count = 0;

    let flag = true;

    $('#tblCart>tr').each(function () {
        if ($($('#tblCart>tr').get(count).children[0]).text() === itemCode) {
            flag = false;
            orderQty = Number.parseInt($($('#tblCart>tr').get(count).children[3]).text()) + Number.parseInt(orderQty);
            $($('#tblCart>tr').get(count).children[3]).text(orderQty);
            total = Number.parseInt($($('#tblCart>tr').get(count).children[4]).text()) + Number.parseInt(total);
            $($('#tblCart>tr').get(count).children[4]).text(total + ".00");
        }
        count++;
    });
    if (flag) {
        $('#tblCart').append(`<tr><td>${itemCode}</td><td>${description}</td><td>${unitPrice}</td><td>${orderQty}</td><td>${total + ".00"}</td></tr>`);
    }

    let newQty;
    newQty = Number.parseInt($('#txtQtyOnHand').val()) - Number.parseInt($('#txtOrderQTY').val());
    $('#txtQtyOnHand').val(newQty);
    let allItems = itemTable;
    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].getCode() === $('#txtItemCode').val()) {
            allItems[i].setQTY(newQty);
        }
    }

    $('#tblCart>tr').off('dblclick');
    $('#tblCart>tr').on('dblclick', function () {
        let newQty;
        let allItems = itemTable;
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i].getCode() === $($(this).children().get(0)).text()) {
                newQty = Number.parseInt($($(this).children().get(3)).text()) + allItems[i].getQTY();
                allItems[i].setQTY(newQty);
            }
        }
        if ($($(this).children().get(0)).text() === $('#txtItemCode').val()) $('#txtQtyOnHand').val(newQty);
        $(this).remove();
        calculateTotal();
        calculateSubTotal();
    });
    $('#txtOrderQTY').val(0);
    calculateTotal();
    disablePlaceOrder();
});

//calculate total
function calculateTotal() {
    let tot = 0;
    let count = 0;

    $('#tblCart>tr').each(function () {
        tot += Number.parseInt($($('#tblCart>tr').get(count).children[4]).text());
        count++;
    });
    $('#lblTotal').text(tot + ".00");
    $('#lblSubTotal').text(tot + ".00");
    $('#txtDiscount').val(0);
    $('#txtPayment').val(tot);
    $('#txtBalance').val("0.00");

}

//calculate sub total
function calculateSubTotal() {
    let subTot = 0;
    let discount = 0;
    if ($('#txtDiscount').val() === "") {
        discount = 0;
    } else {
        discount = Number.parseInt($('#txtDiscount').val());
    }
    subTot = Number.parseInt($('#lblTotal').text()) - discount;

    if (subTot < 0) {
        $('#lblSubTotal').text($('#lblTotal').text());
        $('#txtPayment').val(Number.parseInt($('#lblTotal').text()));
        $('#txtPayment').attr('min', Number.parseInt($('#lblTotal').text()));
    } else {
        $('#lblSubTotal').text(subTot + ".00");
        $('#txtPayment').val(subTot);
        $('#txtPayment').attr('min', subTot);
        calculateBalance();
    }
}

$('#txtPayment').on('keyup', function () {
    calculateBalance();
});

$('#txtDiscount').on('keyup', function () {
    calculateSubTotal();
});

//calculate balance
function calculateBalance() {
    if ($('#txtPayment').val() === "" || Number.parseInt($('#txtPayment').val()) < Number.parseInt($('#lblSubTotal').text())) {
        $('#txtPayment').css('border', '2px solid red');
        $('#lblpayment').text("Please Enter " + $('#lblSubTotal').text() + " or above");
        $('#lblpayment').css('color', 'red');
        $('#lblbalance').css('color', 'red');
        $('#lblpayment').css('font-size', '8px');
        disablePlaceOrder();
        $('#txtBalance').val($('#txtPayment').val() - $('#lblSubTotal').text() + ".00");
    } else {
        $('#txtPayment').css('border', '2px solid green');
        $('#lblpayment').text("");
        $('#txtBalance').val($('#txtPayment').val() - $('#lblSubTotal').text() + ".00");
        enablePlaceOrder();
    }
}

// Tab function remove
$('#txtOrderId,#txtDate,#txtOrderQTY,#txtPayment,#txtDiscount').on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

// Reg Ex
let orderIdRegEx = /^(OR-)[0-9]{1,3}$/;
let discountRegEx = /^\d{1,7}(?:\.\d{0,2})?$/;

$('#txtOrderId,#txtDiscount').on('keyup', function (event) {
    let input1 = $('#txtOrderId').val();
    let input3 = $('#txtDiscount').val();

    if (orderIdRegEx.test(input1)) {
        $('#txtOrderId').css('border', '2px solid green');
        $('#lblorderid').text("");
        if (discountRegEx.test(input3)) {
            $('#txtDiscount').css('border', '2px solid green');
            $('#lbldisount').text("");
            enablePlaceOrder();
        } else {
            $('#txtDiscount').css('border', '2px solid red');
            $('#lbldisount').text("Required field. Maximum 5");
            $('#lbldisount').css('color', 'red');
            $('#lbldisount').css('font-size', '8px');
            disablePlaceOrder();
        }
    } else {
        $('#txtOrderId').css('border', '2px solid red');
        $('#lblorderid').text("Required field. Pattern:-(OR-000)");
        $('#lblorderid').css('color', 'red');
        $('#lblorderid').css('font-size', '8px');
        disablePlaceOrder();
    }
});

// add to cart by enter key
$('#txtOrderQTY').on('keyup', function (event) {
    if (Number.parseInt($('#txtOrderQTY').val()) <= Number.parseInt($('#txtQtyOnHand').val()) &
        Number.parseInt($('#txtOrderQTY').val()) > 0 &
        $('#txtOrderQTY').val() !== "") {
        enableAddToCart();
        $('#txtOrderQTY').css('border', '2px solid green');
        $('#lblorderqty').text("");
        if (event.key === "Enter") {
            $('#btnAddToCart').click();
            $('#cmbItemCode').focus();
            disableAddToCart();
        }
    } else {
        $('#txtOrderQTY').css('border', '2px solid red');
        $('#lblorderqty').text("Please enter an amount lower than: " + $('#txtQtyOnHand').val());
        $('#lblorderqty').css('color', 'red');
        $('#lblorderqty').css('font-size', '8px');
        disableAddToCart();
    }
})

//search Order
$('#txtOrderId').on('keydown', function (event) {
    if (event.key === "Enter") {
        $('#tblCart').empty();
        let order = searchOrder($(this).val());
        if (order != null) {
            $('#txtOrderId').val(order.getOrderId());
            $('#txtDate').val(order.getOrderDate());
            $('#txtCustomerId').val(order.getCusId());
            $('#txtDiscount').val(order.getDiscount());
            let searchCustomer1 = searchCustomer(order.getCusId());
            $('#txtCustomerName').val(searchCustomer1.getCustomerName());
            $('#txtCustomerAddress').val(searchCustomer1.getCustomerAddress());
            $('#txtCustomerSalary').val(searchCustomer1.getCustomerSalary());

            let orderDetail = order.getOrderDetail();
            for (var j in orderDetail) {
                let itemCode1 = orderDetail[j].getItemCode();
                let quantity1 = orderDetail[j].getQuantity();
                let unitPrice1 = orderDetail[j].getUnitPrice();
                let searchItem1 = searchItem(itemCode1);
                let description1 = searchItem1.getDescription();
                let total1 = quantity1 * unitPrice1;
                var row = `<tr><td>${itemCode1}</td><td>${description1}</td><td>${unitPrice1}</td><td>${quantity1}</td><td>${total1 + ".00"}</td></tr>`;
                $('#tblCart').append(row);
            }
        }
        $('#tblCart>tr').off('dblclick');
        $('#tblCart>tr').on('dblclick', function () {
            $(this).remove();
        });
    }
});

function searchOrder(orId) {
    for (var i in orderTable) {
        if (orId === orderTable[i].getOrderId()) {
            return orderTable[i];
        }
    }
    return null;
}

// clear text fields
function clearFields() {
    generateOrderId();
    generateDate();
    $('#txtCustomerId').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerSalary').val("");
    $('#txtItemCode').val("");
    $('#txtDescription').val("");
    $('#txtQtyOnHand').val("");
    $('#txtUnitPrice').val("");
    $('#txtOrderQTY').val("");
    $('#txtPayment').val("");
    $('#txtDiscount').val("");
    $('#txtBalance').val("");
    $('#lblTotal').text("0.00");
    $('#lblSubTotal').text("0.00");
    $('#cmbCustomerId').children().remove();
    $('#cmbItemCode').children().remove();
    $('#tblCart').empty();
}

// disabling and enabling buttons
function disablePlaceOrder() {
    $('#btnPlaceOrder').attr('disabled', 'disabled');
}

function disableAddToCart() {
    $('#btnAddToCart').attr('disabled', 'disabled');
}

function enablePlaceOrder() {
    $('#btnPlaceOrder').removeAttr('disabled');
}

function enableAddToCart() {
    $('#btnAddToCart').removeAttr('disabled');
}
