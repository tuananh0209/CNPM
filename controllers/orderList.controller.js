const orderListModel = require('../models/orderList.model')
const orderListObject = require('../objects/orderList.object')
const foodObject = require('../objects/food.object');
const foodModel = require('../models/food.model')
const userManage = require('../models/userCreat.model');
const orderList = require('../models/orderList.model');
// const orderList = require('../models/orderList.model');

module.exports.orderList = async function (req, res) {
    // var orderList = [];
    // await orderListModel.find({
    //     // __v : 0
    // }, async function (err, data) {
    //     if (err) console.log(err);
    //     try {
    //         await getOrderList(data);
    //            console.log(data);
    //     } catch (err) {
    //         console.log(err);
    //         return;
    //     }
    // });


    // function getOrderList(data) {
    //     var getData = data.map(async function (value) {
    //         await userManage.find({
    //             _id: value.userId
    //         }, function (err, userData) {
    //             if (err) console.log(err);
    //             try {
    //                 var getOrder = new orderListObject.orderList(
    //                     userData[0].name,
    //                     userData[0]._id,
    //                     value.time
    //                 )
    //                 orderList.push(getOrder);
    //                 console.log(getOrder);

    //             } catch (err) {
    //                 res.redirect('orderList');
    //             }
    //         })
    //     })

    // }
    // setTimeout(function () {
    //     console.log(orderList);

    //     res.render('orderList/orderList', {
    //         orderList: orderList
    //     });

    // }, 500);

        var id = req.params.id;
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
                res.redirect(orderList / orderList);
            }
        })
        // console.log(userInfo[0]);
        await orderListModel.find({
            __v : 0
        }, function(err , data){
            try {
                // console.log(data);
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
                // console.log(data);
            }
            catch(err){
                console.log(err);
            }
        })

        setTimeout(function(){
            orderData.map(function(value){
                // console.log(value);
                var foodId = Object.keys(value.cart);
                // console.log(foodId);
                var i = 0;
                let ch = false;
                var foodMatch = foodData.filter(function(x){
                    // console.log(x._id);
                    return foodId.some(function(a){
                        return a == x._id; 
                    });
                })

                // console.log(foodMatch);
                for (i = 0 ; i < foodMatch.length ; i++){
                    
                    // console.log(foodData[i].vendor + " " + userInfo[0].vendor)
                    if (foodMatch[i].vendor == userInfo[0].vendor){
                        dataRender.push(value);
                        break;
                    }
                    

                    // console.log("...................................")
                }
                return value;
            });
            // console.log (dataRender);

            res.render('orderList/orderList', {
                orderList: dataRender
            });
        }, 100);

}

// module.exports.view = function (req, res) {
//     var id = req.params.id;
//     var user = db.get('users').find({
//         id: id
//     }).value();
//     console.log(id);
//     console.log(user);

//     res.render('orderList/view', {
//         users: user
//     });

// };

module.exports.viewOrders = async function (req, res) {
    // var id = req.params.id;
    // var lists = dbOrderList.get('orderLists').find({
    //     userId: id
    // }).value();
    // console.log(id);
    // var foodListID = Object.keys(lists.cart);
    // console.log(foodListID);
    // var food =[];
    // for (i = 0 ; i < foodListID.length; i++){
    //     food.push(db.get('products').find({
    //         id : foodListID[i]
    //     }).value());
    // }
    // console.log (food);
    // res.render('orderList/viewOrders',{
    //     lists : lists,
    //     foodList : food
    // });
    // var id = req.params.id;
    // console.log(id);
    // await orderListModel.find({
    //     userId: id
    // }, function (err, data) {
    //     if (err) console.log(err);
    //     try {
    //         var cart = new foodObject.getFood(Object.keys(data[0].cart));
    //         console.log(cart);
    //         getFoodData(cart.data, data[0]);
    //     } catch (err) {
    //         // res.redirect('orderList');
    //         console.log(err);
    //         return;
    //     }
    // })

    // function getFoodData(cart, data) {
    //     var foodInCart = [];
    //     var a = cart.map(function (value) {
    //         foodModel.find({
    //             _id: value
    //         }, function (err, data) {
    //             if (err) console.log(err);
    //             try {
    //                 console.log(data[0]);
    //                 foodInCart.push(data[0]);
    //                 return data[0];
    //             } catch (err) {
    //                 console.log(err);
    //                 return false;
    //             }
    //         })
    //     })

    //     setTimeout(function () {
    //         console.log(foodInCart);
    //         res.render('orderList/viewOrders', {
    //             lists: data,
    //             foodList: foodInCart
    //         });
    //     }, 500);

    // }

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

    // console.log(userInfo[0]);
    await orderListModel.find({
        _id : id
    }, function (err, data) {
        try {
            console.log(data);
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
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    })
    setTimeout(function(){
        orderData.map(
            function (value) {
                // console.log(value);
                var foodId = Object.keys(value.cart);
                // console.log(foodId);
                var i = 0;
                let ch = false;
                var foodMatch = foodData.filter(function (x) {
                    // console.log(x._id);
                    return foodId.some(function (a) {
                        return a == x._id;
                    });
                })

                // console.log(foodMatch);
                for (i = 0; i < foodMatch.length; i++) {

                    // console.log(foodData[i].vendor + " " + userInfo[0].vendor)
                    if (foodMatch[i].vendor == userInfo[0].vendor) {
                        dataRender.push(foodMatch[i]);
                    }
                    // console.log("...................................")
                }
                return value;
            });
        console.log (dataRender);

        res.render('orderList/viewOrders', {
            lists: orderData[0],
            foodList: dataRender
        });
    }, 100);

}

// module.exports.cart = function (req, res, next) {
//     var productId = req.params.productId;
//     var sessionId = req.signedCookies.sessionId;

//     if (!sessionId) {
//         res.redirect('/products/products');
//         return;
//     }
//     var count = db
//         .get('session')
//         .find({
//             id: sessionId
//         })
//         .get('cart.' + productId, 0)
//         .value();

//     db.get('session')
//         .find({
//             id: sessionId
//         })
//         .set('cart.' + productId, parseInt(count) + 1)
//         .write();

//     res.redirect('/products/products')
// }