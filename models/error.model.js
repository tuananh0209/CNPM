var mongoose = require('mongoose');

var errorData = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    }
});
var errorData = mongoose.model('errorData', errorData, 'errorData');

module.exports = errorData;