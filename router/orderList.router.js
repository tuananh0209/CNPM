const express = require('express')
const controller = require('../controllers/orderList.controller')

const router = express.Router()

router.get('/orderList', controller.orderList);

router.get('/view/:id', controller.viewOrders);

// router.get('/:id', controller.view);

module.exports = router