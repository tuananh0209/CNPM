var mongoose = require('mongoose');

var reportData = new mongoose.Schema({
    vendor: {
        type: String,
        require: true
    },
    name:{
        type:String,
        require: true
    },
    amount:{
        type: String,
        require: true
    },
    price :{
        type: String,
        require: true
    },
    date :{
        type:String,
        require: true
    },
    idFood :{
        type:String, 
        require: true
    }
});
var reportData = mongoose.model('reportData', reportData, 'reportData');

module.exports = reportData;