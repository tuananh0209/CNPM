const db = require('../db')

module.exports.products = function (req, res) {
    var product = db.get("products").value();
    var perPage = parseInt(req.query.page) || 1;
    var size = product.length + 1;
    var begin = (perPage - 1) * 16;
    var end = (perPage - 1) * 16 + 16;
    console.log(size);
    res.render('products/products',{
        product : product.slice(begin , end),
        page : size / 16,
        perPage : perPage
    });
}