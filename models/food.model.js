var mongoose = require('mongoose');

var foodData = new mongoose.Schema({
    vendor: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    }
});
var foodData = mongoose.model('foodData', foodData, 'foodData');

module.exports = foodData;