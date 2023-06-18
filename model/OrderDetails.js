function OrderDetails(oid, code, qty,price) {
    let __orderId = oid;
    let __itemCode = code;
    let __quantity = qty;
    let __unitPrice = price;

    this.getOrderId = function () {
        return __orderId;
    };
    this.setOrderId = function (orderId) {
        __orderId = orderId;
    };
    this.getItemCode = function () {
        return __itemCode;
    };
    this.setItemCode = function (code) {
        __itemCode = code;
    };
    this.getQuantity = function () {
        return __quantity;
    };
    this.setQuantity = function (quantity) {
        __quantity = quantity;
    };
    this.getUnitPrice = function () {
        return __unitPrice;
    };
    this.setUnitPrice = function (unitPrice) {
        __unitPrice = unitPrice;
    }
}