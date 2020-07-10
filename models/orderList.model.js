var mongoose = require('mongoose');

var orderList = new mongoose.Schema({
    note: {
        type: String,
        require: true
    },
    cart: {
        type: Object,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    }
});
var orderList = mongoose.model('orderList', orderList, 'orderList');


module.exports = orderList; 