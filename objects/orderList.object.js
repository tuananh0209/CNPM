module.exports.orderList = class orderList {
    constructor(userName, id, time) {
        this.id = id;
        this.userName = userName;

        this.time = time;
    }
}

module.exports.getOrderList = class getOrderList {
        constructor(data) {
            this.data = data
    }
}