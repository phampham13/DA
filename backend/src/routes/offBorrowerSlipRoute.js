const express = require("express");
const router = express.Router()
const offSlipController = require('../controllers/OffBorrowerSlipController');
const { authMiddleWare } = require('~/middlewares/authMiddleware')

//router.post('/create/:id', authMiddleWare, offSlipController.createOffSlip)
//router.get('/get-all-borrower-slip/:id', authMiddleWare, offSlipController.getAllOffSlip) //get all user's Slip
//router.get('/get-details-slip/:id', authMiddleWare, offSlipController.getDetailsOffSlip)
//router.get('/get-all-borrower-slip', authMiddleWare, offSlipController.getAllBorrowerSlip) //amin get all borrower slip
//router.post('/delete-many', authMiddleWare, offSlipController.deleteManyBorrowerSlip)
//router.delete('/delete/:id', authMiddleWare, offSlipController.deleteOrder)

module.exports = router