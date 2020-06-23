var mongoose = require('mongoose');

var userManage = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    pass : {
        type: String,
        require: true
    },
    vendor : {
        type: String,
        require: true
    }
});
var userManage = mongoose.model('userManage' , userManage , 'userManage');

module.exports = userManage;