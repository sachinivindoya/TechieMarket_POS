//Item Add
$('#btnItemAdd').click(function () {
    let itemCode = $('#txtItemCode0').val();
    let description = $('#txtDescription0').val();
    let qty = $('#txtQty0').val();
    let unitPrice = $('#txtUnitPrice0').val();

    let res = saveItem(itemCode, description, qty, unitPrice);
    if (res) {
        clearItem();
    }
});

//Item Update
$('#btnItemUpdate').click(function () {
    let itemCode = $('#txtItemCode0').val();
    let description = $('#txtDescription0').val();
    let qty = $('#txtQty0').val();
    let unitPrice = $('#txtUnitPrice0').val();

    let option = confirm(`Do you want to Update Item Code:${itemCode}`);
    if (option) {
        let res = updateItem(itemCode, description, qty, unitPrice);
        if (res) {
            alert("Item Updated!");
            loadAllItemsToTable();
            clearItem();
        } else {
            alert("Update Failed!");
        }
    }
});

//Customer Delete
$('#btnItemDelete').click(function () {
    let code = $('#txtItemCode0').val();

    let option = confirm(`Do you want to Delete Item Code:${code}`);
    if (option) {
        let res = deleteItem(code);
        if (res) {
            alert("Item Deleted!");
        } else {
            alert("Delete Failed!");
        }
    }
    loadAllItemsToTable();
    clearItem();
});

// clear fields
$('#btnItemCancel').click(function () {
    clearItem();
});

function saveItem(code, desc, qty, price) {
    let itemDTO = new ItemDTO(code, desc, qty, price);
    itemTable.push(itemDTO);
    loadAllItemsToTable();
    return true;
}

function searchItem(code) {
    for (var i in itemTable) {
        if (itemTable[i].getCode() == code) return itemTable[i];
    }
    return null;
}

function getAllItems() {
    return itemTable;
}

function loadAllItemsToTable() {
    let allItems = getAllItems();
    $('#tblItem').empty();
    for (var i in allItems) {
        let code = allItems[i].getCode();
        let desc = allItems[i].getDescription();
        let qty = allItems[i].getQTY();
        let price = allItems[i].getPrice();

        var row = `<tr><td>${code}</td><td>${desc}</td><td>${qty}</td><td>${price}</td></tr>`;
        $('#tblItem').append(row);
    }

    // Table click Event
    $('#tblItem>tr').off('click');
    $('#tblItem>tr').click(function () {
        let code = $(this).children('td:eq(0)').text();
        let desc = $(this).children('td:eq(1)').text();
        let qty = $(this).children('td:eq(2)').text();
        let price = $(this).children('td:eq(3)').text();

        $("#txtItemCode0").val(code);
        $("#txtDescription0").val(desc);
        $("#txtQty0").val(qty);
        $("#txtUnitPrice0").val(price);
    });
}

function updateItem(code, desc, qty, price) {
    let result = searchItem(code);
    if (result != null) {
        result.setDescription(desc);
        result.setQTY(qty);
        result.setPrice(price);
        return true;
    } else {
        return false;
    }
}

function deleteItem(code) {
    let result = searchItem(code);
    if (result != null) {
        let number = itemTable.indexOf(result);
        itemTable.splice(number, 1);
        return true;
    } else {
        return false;
    }
}

// Reg Ex
let codeRegEx = /^(I00-)[0-9]{1,3}$/;
let descRegEx = /^[A-z| |0-9]{1,25}$/;
let qtyRegEx = /^[0-9]{1,4}$/;
let priceRegEx = /^\d{1,4}(?:\.\d{0,2})?$/;

$('#txtItemCode0,#txtDescription0,#txtQty0,#txtUnitPrice0').on('keyup', function (event) {
    let input1 = $('#txtItemCode0').val();
    let input2 = $('#txtDescription0').val();
    let input3 = $('#txtQty0').val();
    let input4 = $('#txtUnitPrice0').val();

    if (codeRegEx.test(input1)) {
        $('#txtItemCode0').css('border', '2px solid green');
        $('#lblitemcode').text("");
        if (event.key === "Enter") {
            $('#txtDescription0').focus();
        }
        if (descRegEx.test(input2)) {
            $('#txtDescription0').css('border', '2px solid green');
            $('#lbldescription').text("");
            if (event.key === "Enter") {
                $('#txtQty0').focus();
            }
            if (qtyRegEx.test(input3)) {
                $('#txtQty0').css('border', '2px solid green');
                $('#lblqty').text("");
                if (event.key === "Enter") {
                    $('#txtUnitPrice0').focus();
                }
                if (priceRegEx.test(input4)) {
                    $('#txtUnitPrice0').css('border', '2px solid green');
                    $('#lblprice').text("");
                    enableButton2();
                    if (event.key === "Enter") {
                        $('#btnItemAdd').click();
                        $('#txtItemCode0').focus();
                    }
                } else {
                    $('#txtUnitPrice0').css('border', '2px solid red');
                    $('#lblprice').text("Required field. Pattern:-(100.00 or 100)");
                    $('#lblprice').css('color', 'red');
                    $('#lblprice').css('font-size', '8px');
                    disableButton2();
                }
            } else {
                $('#txtQty0').css('border', '2px solid red');
                $('#lblqty').text("Required field. Maximum 5");
                $('#lblqty').css('color', 'red');
                $('#lblqty').css('font-size', '8px');
                disableButton2();
            }
        } else {
            $('#txtDescription0').css('border', '2px solid red');
            $('#lbldescription').text("Required field. characters and numbers Allowed.");
            $('#lbldescription').css('color', 'red');
            $('#lbldescription').css('font-size', '8px');
            disableButton2();
        }
    } else {
        $('#txtItemCode0').css('border', '2px solid red');
        $('#lblitemcode').text("Required field. Pattern:-(I00-000)");
        $('#lblitemcode').css('color', 'red');
        $('#lblitemcode').css('font-size', '8px');
        disableButton2();
    }
});

function disableButton2() {
    $('#btnItemAdd').attr('disabled', 'disabled');
    $('#btnItemUpdate').attr('disabled', 'disabled');
}

function enableButton2() {
    $('#btnItemAdd').removeAttr('disabled');
    $('#btnItemUpdate').removeAttr('disabled');
}

$('#txtItemCode0,#txtDescription0,#txtQty0,#txtUnitPrice0').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});

function clearItem() {
    $('#txtItemCode0').val("");
    $('#txtDescription0').val("");
    $('#txtQty0').val("");
    $('#txtUnitPrice0').val("");
    disableButton2();
    $('#lblitemcode,#lbldescription,#lblqty,#lblprice').text("");
    $('#lblitemcode,#lbldescription,#lblqty,#lblprice').css('color',"");
    $('#txtItemCode0,#txtDescription0,#txtQty0,#txtUnitPrice0').css('border','');
}