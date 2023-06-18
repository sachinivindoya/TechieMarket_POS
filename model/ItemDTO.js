function ItemDTO(code, description, qty, price) {
    var __code = code;
    var __description = description;
    var __qty = qty;
    var __price = price;

    this.getCode = function () {
        return __code;
    }
    this.setCode = function (newCode) {
        __code = newCode;
    }
    this.getDescription = function () {
        return __description;
    }
    this.setDescription = function (newDesc) {
        __description = newDesc;
    }
    this.getQTY = function () {
        return __qty;
    }
    this.setQTY = function (newQty) {
        __qty = newQty;
    }
    this.getPrice = function () {
        return __price;
    }
    this.setPrice = function (newPrice) {
        __price = newPrice;
    }
}