function OrderDTO(orderId, orderDate, cusId, odrDetail,discount) {
    var __orderId = orderId;
    var __orderDate = orderDate;
    var __cusId = cusId;
    let __orderDetail = odrDetail;
    let __discount = discount;

    this.getOrderId = function () {
        return __orderId;
    }
    this.setOrderId = function (newId) {
        __orderId = newId;
    }
    this.getOrderDate = function () {
        return __orderDate;
    }
    this.setOrderDate = function (newDate) {
        __orderDate = newDate;
    }
    this.getCusId = function () {
        return __cusId;
    }
    this.setCusId = function (newId) {
        __cusId = newId;
    }
    this.getOrderDetail = function () {
        return __orderDetail;
    }
    this.setOrderDetail = function (newOrderDetail) {
        __orderDetail = newOrderDetail;
    }
    this.getDiscount= function () {
        return __discount;
    }
    this.setDiscount = function (newDiscount) {
        __discount = newDiscount;
    }

}