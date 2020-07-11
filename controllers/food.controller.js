// var db = require('../db')
const shortid = require('shortid')
const md5 = require('md5')
const foodModel = require('../models/food.model');
const foodData = require('../objects/food.object');
const userMatch = require('../objects/userManage.object');
const userManage = require('../models/userCreat.model');


var user;
var getFoodDatas;
var id;
var getItem;

module.exports.foodList = async function (req, res) {
    
    
    await userManage.find({
        _id: req.signedCookies.userId
    }, function (err, data) {
       
            if (err) {
                if (err) console.log(err);
            }
            if (data)
                user = new userMatch(data[0].name, data[0]._id, data[0]._pass, data[0].vendor);
                if (!user) {
                    
                    res.redirect('food');
                }
           
    })
    
        setTimeout(function(){
            foodModel.find({
                vendor: user.vendor
            }, function (err, data) {
                if (err) return next(err);
                // console.log(req.headers.host);
                if (data)
                    getFoodDatas = new foodData.getFood(data);
                // console.log(data);
                res.render('food/food', {
                    foodData: getFoodDatas.data,
                    src: req.headers.host
                })

            });
    
        },100);
    
   
};

module.exports.search = function (req, res) {
    var name = req.query.q;
    var itemMatched =  getFoodDatas.data.filter(function(data){
        return data.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    })
    res.render('food/food', {
        foodData: itemMatched,
        inputs: name,
        src: req.headers.host
    });

};

module.exports.creat = function (req, res) {
    console.log(req.cookies); 
    res.render('food/creat');
};

module.exports.postCreat = async function (req, res) {

    var foodData = new foodModel({
        name : req.body.name,
        image : req.file.path.slice(7).replace(/\\/g,"/"),
        price : req.body.price,
        vendor: req.body.vendor
    })
    console.log(foodData.image);
    await foodData.save(function(err){
        console.log(err);
        res.redirect('/food/food');
    })
};

module.exports.edit = async function (req, res) { 
    
    // await foodDatas.findByIdAndUpdate({
    //     _id : req.params.id
    // }, function(err , data){
    //     if(err) console.log(err);
    //     console.log(data);
    // })

    id = req.params.id;
    getItem = getFoodDatas.data.filter(function(data){
        return data._id == id;
    })
    console.log(getItem[0]);
    res.render('food/edit', {
        itemData : getItem[0]
    });
};

module.exports.update = async function(req , res){
    
   

    try {    
        var foodUpdate = new foodData.food(
            req.body.name,
            req.file.path.slice(7).replace(/\\/g, "/"),
            req.body.price,
            req.body.vendor
        )
    }
    catch(err){
        console.log(err);
         var foodUpdate = new foodData.food(
            req.body.name,
            getItem[0].image,
            req.body.price,
            req.body.vendor
         )
    }
    console.log(req.body);
  

    await foodModel.findByIdAndUpdate({
        _id : id
    }, {
        
    $set : foodUpdate
        
    },
    function (err, data) {
        if(err) console.log(err);
        console.log(data);
    })

    res.redirect('food');
}
module.exports.errors = function (req, res) {

    res.render('users/errors');
}