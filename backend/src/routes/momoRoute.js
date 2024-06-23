const express = require('express');
const router = express.Router();
const momoController = require('../controllers/MomoController');

router.post('/create-payment', momoController.createPayment);
router.post('/callback', momoController.check);
router.post('/transaction-status', momoController.transactionCheck);
router.post('/refund', momoController.refund);

module.exports = router;
