const express = require('express')
const controller = require('../controllers/product.controller')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const upload = multer({
    dest: "./public/image"
})

const router = express.Router()

router.get('/cart', controller.cart);

router.get('/', controller.products);

router.post('/' , controller.err);

router.get('/search', controller.search);


router.get('/check_out' , controller.checOut);

router.post('/place_order' , controller.placeOrder);

router.post('/update/:id', controller.upCart);

router.get('/:id' , controller.addCart);


module.exports = router