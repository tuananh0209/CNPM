<<<<<<< HEAD
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
    userId: {
        type: String,
        require: true
    },
    time :{
        type : String,
        require : true
    }
});
var orderList = mongoose.model('orderList', orderList, 'orderList');

=======
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
    userId: {
        type: String,
        require: true
    },
    time :{
        type : String,
        require : true
    }
});
var orderList = mongoose.model('orderList', orderList, 'orderList');

>>>>>>> de14f9a761f0579b9b0d49696f5b5f00e61319dc
module.exports = orderList;