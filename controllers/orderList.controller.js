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
// };

module.exports.viewOrders = function (req, res){
    res.render('orderList/viewOrders');
}