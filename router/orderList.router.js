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

>>>>>>> d5136f156b4d1f5286304e5f9a30e4fcec774e5b
module.exports = router