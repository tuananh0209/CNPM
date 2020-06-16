const express = require('express')
const controller = require('../controllers/cart.controller')
const router = express.Router();

router.get('/:productId' , controller.cart)

module.exports = router