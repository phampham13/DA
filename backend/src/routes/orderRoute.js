const express = require("express");
const router = express.Router()
const orderController = require('../controllers/OrderController');
const { authUserMiddleWare } = require('~/middlewares/authMiddleware')

router.get('/:id', authUserMiddleWare, cartController.getDetail)
router.put('/update/:id', authUserMiddleWare, cartController.updateCart)

module.exports = router