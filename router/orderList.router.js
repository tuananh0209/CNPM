const express = require('express')
const controller = require('../controllers/orderList.controller')

const router = express.Router()

router.get('/orderList', controller.orderList);

router.get('/:id', controller.viewOrders);

router.get('/complete/:id' , controller.complete);

module.exports = router 