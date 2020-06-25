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

>>>>>>> d5136f156b4d1f5286304e5f9a30e4fcec774e5b
module.exports = orderList;