const orderListModel = require('../models/orderList.model')
const orderListObject = require('../objects/orderList.object')
const foodObject = require('../objects/food.object');
const foodModel = require('../models/food.model')
const userManage = require('../models/userCreat.model');
// const orderList = require('../models/orderList.model');

module.exports.orderList = async function (req, res) {
    var orderList = [];
    await orderListModel.find({
        // __v : 0
    }, async function (err, data) {
        if (err) console.log(err);
        try {
            await getOrderList(data);
            //    console.log(data);
        } catch (err) {
            console.log(err);
            return;
        }
    });


    function getOrderList(data) {
        var getData = data.map(async function (value) {
            await userManage.find({
                _id: value.userId
            }, function (err, userData) {
                if (err) console.log(err);
                try {
                    var getOrder = new orderListObject.orderList(
                        userData[0].name,
                        userData[0]._id,
                        value.time
                    )
                    orderList.push(getOrder);
                    console.log(getOrder);

                } catch (err) {
                    res.redirect('orderList');
                }
            })
        })

    }
    setTimeout(function () {
        console.log(orderList);

        res.render('orderList/orderList', {
            orderList: orderList
        });

    }, 500);

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
    var id = req.params.id;
    console.log(id);
    await orderListModel.find({
        userId: id
    }, function (err, data) {
        if (err) console.log(err);
        try {
            var cart = new foodObject.getFood(Object.keys(data[0].cart));
            console.log(cart);
            getFoodData(cart.data, data[0]);
        } catch (err) {
            // res.redirect('orderList');
            console.log(err);
            return;
        }
    })

    function getFoodData(cart, data) {
        var foodInCart = [];
        var a = cart.map(function (value) {
            foodModel.find({
                _id: value
            }, function (err, data) {
                if (err) console.log(err);
                try {
                    console.log(data[0]);
                    foodInCart.push(data[0]);
                    return data[0];
                } catch (err) {
                    console.log(err);
                    return false;
                }
            })
        })

        setTimeout(function () {
            console.log(foodInCart);
            res.render('orderList/viewOrders', {
                lists: data,
                foodList: foodInCart
            });
        }, 500);

    }


}

module.exports.cart = function (req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products/products');
        return;
    }
    var count = db
        .get('session')
        .find({
            id: sessionId
        })
        .get('cart.' + productId, 0)
        .value();

    db.get('session')
        .find({
            id: sessionId
        })
        .set('cart.' + productId, parseInt(count) + 1)
        .write();

    res.redirect('/products/products')
}