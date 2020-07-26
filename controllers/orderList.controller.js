const orderListModel = require('../models/orderList.model')
const orderListObject = require('../objects/orderList.object')
const foodObject = require('../objects/food.object');
const foodModel = require('../models/food.model')
const userManage = require('../models/userCreat.model');
const orderList = require('../models/orderList.model');

module.exports.orderList = async function (req, res) {
 
        var userId = req.signedCookies.userId;

        
        var userInfo;
        var orderData;
        var foodData;
        var dataRender = [];
        await userManage.find({
            _id: userId
        }, function (err, userData) {
            try{
                userInfo = userData;
            }
            catch(err){
                res.redirect('orderList/orderList');
            }
        })
     
        await orderListModel.find({
            __v : 0
        }, function(err , data){
            try {
                orderData = data;
            }
            catch(err){
                console(err);
            } 
        })

        await foodModel.find({
            __v : 0
        }, function(err , data){
            try{
                foodData = data;
            }
            catch(err){
                console.log(err);
            }
        })

        setTimeout(function(){
            orderData.map(function(value){
                var foodId = Object.keys(value.cart);
                var i = 0;
             
                var foodMatch = foodData.filter(function(x){
                    return foodId.some(function(a){
                        return a == x._id; 
                    });
                })

                for (i = 0 ; i < foodMatch.length ; i++){
                    
                    if (foodMatch[i].vendor == userInfo[0].vendor){
                        if (value.status[userInfo[0].vendor] == false) 
                        dataRender.push(value);
                        break;
                    }
                    

                }
                return value;
            });
      

            res.render('orderList/orderList', {
                orderList: dataRender,
                
            });
        }, 100);
}

module.exports.viewOrders = async function (req, res) {
    var id = req.params.id;
    var userId = req.signedCookies.userId;


    var userInfo;
    var orderData;
    var foodData;
    var dataRender = [];
    await userManage.find({
        _id: userId
    }, function (err, userData) {
        try {
            userInfo = userData;
        } catch (err) {
            res.redirect(orderList / orderList);
        }
    })

    await orderListModel.find({
        _id : id
    }, function (err, data) {
        try {
            orderData = data;
        } catch (err) {
            console(err);
        }
    })

    await foodModel.find({
        __v: 0
    }, function (err, data) {
        try {
            foodData = data;
        } catch (err) {
            console.log(err);
        }
    })
    setTimeout(function(){
        orderData.map(
            function (value) {
                var foodId = Object.keys(value.cart);
                var i = 0;
                var foodMatch = foodData.filter(function (x) {
                    return foodId.some(function (a) {
                        return a == x._id;
                    });
                })

                for (i = 0; i < foodMatch.length; i++) {

                    if (foodMatch[i].vendor == userInfo[0].vendor) {
                        dataRender.push(foodMatch[i]);
                    }
                }
                return value;
            });
    

        res.render('orderList/viewOrders', {
            lists: orderData[0],
            foodList: dataRender
        });
    }, 100);

}


module.exports.complete = async function(req , res){
    var id = req.params.id;
    var userId = req.signedCookies.userId;

    var userInfo;
    var orderData;
    try{
        await userManage.findById(
            userId
        , function (err, userData) {
            try {
                userInfo = userData;
            } catch (err) {
                res.redirect(orderList / orderList);
            }
        })

        await orderListModel.findOne({
            _id : id
        }
        , function (err, data) {

            orderData = data;
            data.status[userInfo.vendor] = true;
            
        });

        await orderListModel.findOneAndUpdate({
            _id: id
        }, orderData, {
            upsert: true
        },
        function (err, data) {
         
            res.redirect('/orderList/orderList')
        })
    }

    catch(err){
        res.redirect('/orderList/orderList')
    }
}