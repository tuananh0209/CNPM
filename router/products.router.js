const express = require('express')
const controller = require('../controllers/product.controller')

const router = express.Router()

router.get('/products', controller.products);

module.exports = router  