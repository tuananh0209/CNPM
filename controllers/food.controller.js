var db = require('../db')
const shortid = require('shortid')
const md5 = require('md5')
const foodModel = require('../models/food.model');
const foodData = require('../objects/food.object');
const userMatch = require('../objects/userManage.object');
const userManage = require('../models/userCreat.model');

var user;
var getFoodData;


module.exports.foodList = async function (req, res) {
    
    
    await userManage.find({
        _id: req.signedCookies.userId
    }, function (err, data) {

        if (err) {
            if (err) return next(err);
        }
        if (data)
            user = new userMatch(data[0].name, data[0]._id, data[0]._pass, data[0].vendor);
    })


    await foodModel.find({
        vendor : user.vendor
    }, function(err , data){
        if (err) return next(err);
        console.log(req.headers.host);
        if (data) 
            getFoodData = new foodData.getFood(data);
            console.log(data);
            res.render('food/food', {
            foodData : getFoodData.data,        
            src : req.headers.host
        })
        
    })
};

module.exports.search = function (req, res) {
    var name = req.query.q;
    var userMatched = db.get('users').value().filter(function (value) {
        return value.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    })
    res.render('food/food', {
        users: userMatched,
        inputs: name 
    });

};

module.exports.creat = function (req, res) {
    console.log(req.cookies);
    res.render('food/creat');
};

module.exports.postCreat = async function (req, res) {

    var foodDatas = new foodModel({
        name : req.body.name,
        image : req.file.path.slice(7),
        price : req.body.price,
        vendor: req.body.vendor
    })
    await foodDatas.save(function(err){
        console.log(err);
        res.redirect('/food/food');
    })
};

module.exports.view = function (req, res) { 
    var id = req.params.id;
    var user = db.get('orderLists').find({
        id: id
    }).value();
    console.log(id);
    console.log(user);

    res.render('food/view', {
        users: user
    });
};

module.exports.errors = function (req, res) {
    res.render('users/errors');
}