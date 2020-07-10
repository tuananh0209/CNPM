module.exports.orderList = class orderList {
    constructor(userName, vendor , id, time) {
        this.id = id;
        this.vendor = vendor;
        this.userName = userName;
        this.time = time;
    }
}

module.exports.getOrderList = class getOrderList {
        constructor(data) {
            this.data = data
    }
}