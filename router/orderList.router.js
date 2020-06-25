<<<<<<< HEAD
const express = require('express')
const controller = require('../controllers/orderList.controller')

const router = express.Router()

router.get('/orderList', controller.orderList);

router.get('/:id', controller.viewOrders);

// router.get('/:id', controller.view);

=======
const express = require('express')
const controller = require('../controllers/orderList.controller')

const router = express.Router()

router.get('/orderList', controller.orderList);

router.get('/:id', controller.viewOrders);

// router.get('/:id', controller.view);

>>>>>>> de14f9a761f0579b9b0d49696f5b5f00e61319dc
module.exports = router