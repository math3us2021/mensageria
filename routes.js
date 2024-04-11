const express = require('express');
const router = express.Router();
const ordersController = require('./controllers/ordersControllers');

router.get('/orders', ordersController.getAllOrders);
router.get('/orders/:orderId', ordersController.getOrderById);

module.exports = router;