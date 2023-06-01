$('#btnCustomerForm').click(function() {
    // Load the card.html file into the #card-container div
    document.querySelector("#DasboardForm").style.display="none";
    document.querySelector("#OrderDetailsForm").style.display="none";
    document.querySelector("#placeOrderForm").style.display="none";
    document.querySelector("#customerForm").style.display="block";
    document.querySelector("#itemForm").style.display="none";
});

$('#btnItemForm').click(function() {
    // Load the card.html file into the #card-container div
    document.querySelector("#DasboardForm").style.display="none";
    document.querySelector("#OrderDetailsForm").style.display="none";
    document.querySelector("#placeOrderForm").style.display="none";
    document.querySelector("#itemForm").style.display="block";
    document.querySelector("#customerForm").style.display="none";
});

$('#btnPlaceorderForm').click(function() {
    // Load the card.html file into the #card-container div
    document.querySelector("#DasboardForm").style.display="none";
    document.querySelector("#OrderDetailsForm").style.display="none";
    document.querySelector("#placeOrderForm").style.display="block";
    document.querySelector("#itemForm").style.display="none";
    document.querySelector("#customerForm").style.display="none";
});

$('#btnOrderDetailsForm').click(function() {
    // Load the card.html file into the #card-container div
    document.querySelector("#DasboardForm").style.display="none";
    document.querySelector("#OrderDetailsForm").style.display="block";
    document.querySelector("#placeOrderForm").style.display="none";
    document.querySelector("#itemForm").style.display="none";
    document.querySelector("#customerForm").style.display="none";
});

$('#logoName').click(function() {
    // Load the card.html file into the #card-container div
    document.querySelector("#DasboardForm").style.display="block";
    document.querySelector("#OrderDetailsForm").style.display="none";
    document.querySelector("#placeOrderForm").style.display="none";
    document.querySelector("#itemForm").style.display="none";
    document.querySelector("#customerForm").style.display="none";
});

//item global array
var itemList = [];

//add customer
$('#itemAddbtnSave').click(function () {
    let item = {
        Code : $("#itemAddCode").val(),
        Description : $("#itemAddDescription").val(),
        QTY : $("#itemAddQTY").val(),
        UnitPrice : $("#itemAddUnitPrice").val()
    }
    itemList.push(item);
    $('#itemAddModal').modal('hide');
    alert("item saved!");
    $('#viewAllTableBody').append(
        '<tr>\n' +
        '          <td>'+item.Code+'</td>\n' +
        '          <td>'+item.Description+'</td>\n' +
        '          <td>'+item.QTY+'</td>\n' +
        '          <td>'+item.UnitPrice+'</td>\n' +
        '        </tr>'
    );
});
