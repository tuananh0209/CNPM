const foodModel = require('../models/food.model');
const foodData = require('../objects/food.object');
const userMatch = require('../objects/userManage.object');
const userManage = require('../models/userCreat.model');
const orderListModel = require('../models/orderList.model')
const orderListObject = require('../objects/orderList.object')
const reportData = require('../models/report.model')
const errorData = require('../models/error.model')


const db = require('../db');


var getFoodDatas;
var prices = 0;
var carts;


module.exports.products = async function (req, res) {
        var price = 0;
        var cart;

        var sessionId = req.signedCookies.sessionId;
        var cartData = db.get('session')
        .find({
            id : sessionId
        }).value();

        if (cartData != undefined)
        try{
            cart = Object.keys(cartData.cart);
        }
        catch(err){
            cart = [];
        }
            

        await foodModel.find({
             
         }, function (err, data) {
             if (err) return next(err);
             // console.log(req.headers.host);
             if (data)
                getFoodDatas = new foodData.getFood(data);
                var i = 0;
                if (cartData != undefined){
                    cart.forEach(function(value){
                        x = getFoodDatas.data.filter(function(data){
                            if (data._id == value){
                                price += parseInt(data.price) * parseInt(cartData.cart[value]);
                            } 
                            return data._id == value;
                        })
               
                    });
                }
   
            
            res.render('home', {
                foodData: getFoodDatas.data,
                src: req.headers.host,
                cart : cart == undefined ? 0 : cart.length,
                price : price,
                cartList : cart
             })
            prices = price;
            carts = cart;
         });
         

}

module.exports.search = function (req, res) {
    var name = req.query.q;
    var itemMatched = getFoodDatas.data.filter(function (data) {
        return data.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    })
    res.render('home', {
        foodData: itemMatched,
        inputs: name,
        src: req.headers.host,
        cart: carts == undefined ? 0 : carts.length,
        price: prices
    });

};


module.exports.addCart = function (req, res, next) {
    var productId = req.body.id;
    var sessionId = req.signedCookies.sessionId;
    
    
    if (!sessionId) {
       
        res.redirect('/');
        return;
    }
    
    var check = db.get('session').find({
        id : sessionId
    }).value();

    var session = {
        id : sessionId
    }

    if (check == undefined) {
        db.get('session').push(session).write();
    }
    var count = db
        .get('session')
        .find({
            id: sessionId
        })
        .get('cart.' + productId, 0)
        .value();
    

    if (  productId.length > 20 )
        db.get('session')
            .find({
                id: sessionId
            })
            .set('cart.' + productId, parseInt(count) + 1)
            .write();

}

module.exports.cart = async function(req , res ){
    var price = 0;
    var cartItem = [];
    var cart;
    var sessionId = req.signedCookies.sessionId;
    var cartData = db.get('session')
        .find({
            id: sessionId
        }).value();

    if (cartData != undefined && cartData != null)
    try {   
        cart = Object.keys(cartData.cart);
    }
    catch(err){
        res.render('cartEmpty');
        return;
    }
  
    await foodModel.find({
 
    }, function (err, data) {
        if (err) return next(err);
     
        if (data)
            getFoodDatas = new foodData.getFood(data);
        var i = 0;
        if (cartData != undefined) { 
            cart.forEach(function (value) {
                x = getFoodDatas.data.filter(function (data) {
                    if (data._id == value) {
                        price += parseInt(data.price) * parseInt(cartData.cart[value]);
                        cartItem.push(data);
                    }
                    return data._id == value;
                });
              
            });
        }
    
        res.render('cart', {
            foodData: getFoodDatas.data,
            src: req.headers.host, 
            cart: cart == undefined ? 0 : cart.length,
            price: price,
            cartItem : cartItem,
            cartData : cartData
        })

    });
}

module.exports.upCart = async function(req , res , next){

    var quantity = req.body.quantity;
    var id = req.body.id;
    var session = req.signedCookies.sessionId;

    try {
        if (quantity != '0'){
     

            var getData = db.get('session')
                .find({
                id : session
                })
                .set('cart.' + id , parseInt(quantity))
                .write();
            if (getData == undefined) {
                 var temp = {
                     id: session
                 }
                db.get('session').push(temp).write();
                    getData = db.get('session')
                    .find({
                        id: session
                    })
                    .set('cart.' + id, parseInt(quantity))
                    .write();
            }
        }else {
            
            var getData = db.get("session")
            .find({
                id :session
            })
            .unset('cart.' + id)
            .write();

            getData = db.get('session')
            .find({
                id : session
            })
            .value();
            var i = 0;
            for (x in getData.cart){
                i++;
            }
            if (i == 0){
                getData = db.get('session')
                    .remove({
                        id : session
                    })
                    .write();
            }
             
        return;
        }
    }
    catch(err){
        res.location('/cart');
        console.log(err);
    }
    
}

module.exports.checOut = async function(req , res){
    var price = 0;
    var cartItem = [];
    var cart;
    var sessionId = req.signedCookies.sessionId;
    var cartData = db.get('session')
        .find({
            id: sessionId
        }).value();

    if (cartData != undefined && cartData != null)
        try {
            cart = Object.keys(cartData.cart);
        }
    catch (err) {
        res.render('cartEmpty');
        return;
    }
   
    await foodModel.find({

    }, function (err, data) {
        if (err) return next(err);
   
        if (data)
            getFoodDatas = new foodData.getFood(data);
        var i = 0;
        if (cartData != undefined) {
            cart.forEach(function (value) {
                x = getFoodDatas.data.filter(function (data) {
                    if (data._id == value) {
                        price += parseInt(data.price) * parseInt(cartData.cart[value]);
                        cartItem.push(data);
                    }
                    return data._id == value;
                });
            
            });
        }
     


        res.render('checkCout', {
            foodData: getFoodDatas.data,
            src: req.headers.host,
            cart: cart == undefined ? 0 : cart.length,
            price: price,
            cartItem: cartItem,
            cartData: cartData
        })
    });
}

module.exports.placeOrder = async function(req , res){
    var session = req.signedCookies.sessionId;
    var userInfo = req.body;
    var d = new Date();
    var date = d.toLocaleDateString();
    var time = d.toLocaleTimeString();
    var dateTime = date + ' ' + time;

    var status = {};

    var orderData = db.get('session')
    .find({
        id : session
    }).value();

    

    var foodData;

    await foodModel.find({
        __v: 0
    }, function (err, data) {
        try {
            foodData = data;
           
        } catch (err) {
            console.log(err);
        }
    })

    setTimeout(function () {
        
            var foodId = Object.keys(orderData.cart);
           
            var foodMatch = foodData.filter(function (x) {
                return foodId.some(function (a) {
                    return a == x._id;
                });
            })
            var statusKey = [];
            foodMatch.map(async function(data){
                var report = new reportData({
                    vendor : data.vendor,
                    name : data.name,
                    price: data.price,
                    date : dateTime,
                    amount : orderData.cart[data._id],
                    idFood : data._id
                })

                if (statusKey.indexOf(data.vendor) == -1){
                    statusKey.push(data.vendor);
                    status[data.vendor] = false;
                }
                

                await report.save(function(err){
                  
                })

            })
        
            var orderList = new orderListModel({
                note: userInfo.note,
                userName: userInfo.firstName + " " + userInfo.lastName,
                cart: orderData.cart,
                time: dateTime,
                status : status
            })
         
            orderList.save(function (err) {
               
            })
            res.clearCookie('sessionId');
            res.redirect('/');
    }, 100);
} 

module.exports.err = async function(req , res){
     var dd = new Date();
     var date = dd.toLocaleDateString();
     var time = dd.toLocaleTimeString();
     var dateTime = date + ' ' + time;
    
    try {
        var err = new errorData({
            content : req.body.message,
            time : dateTime
        })

        await err.save(function(err){
          
        })
    }
    catch(err){
        return;
    }
} 