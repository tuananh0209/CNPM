const db = require('../db')
const dbOrderList = require('../dbOrderLists')

module.exports.orderList = function (req, res) {
    res.render('orderList/orderList');
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
// }; nacabuxi

module.exports.viewOrders = function (req, res){
    var id = req.params.id;
    var lists = dbOrderList.get('orderLists').find({
        userId: id
    }).value();
    console.log(id);
    var foodListID = Object.keys(lists.cart);
    console.log(foodListID);
    var food =[];
    for (i = 0 ; i < foodListID.length; i++){
        food.push(db.get('products').find({
            id : foodListID[i]
        }).value());
    }
    console.log (food);
    res.render('orderList/viewOrders',{
        lists : lists,
        foodList : food
    });
}

module.exports.cart = function (req, res , next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId){
        res.redirect('/products/products');
        return;
    }
    var count = db
    .get('session')
    .find({ id : sessionId})
    .get('cart.' + productId , 0)
    .value();

    db.get('session')
    .find({ id : sessionId })
    .set('cart.' + productId , parseInt(count) + 1)
    .write();

    res.redirect('/products/products')
}