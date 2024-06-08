const express = require("express");
const router = express.Router()
const borrowerSlipController = require('../controllers/BorrowerSlipController');
const { authUserMiddleWare, authMiddleWare } = require('~/middlewares/authMiddleware')

router.post('/create/:id', authUserMiddleWare, borrowerSlipController.createBorrowerSlip)
router.get('/get-all-borrower-slip/:id', authUserMiddleWare, borrowerSlipController.getAllUserSlip) //get all user's Slip
router.get('/get-details-slip/:id', authUserMiddleWare, borrowerSlipController.getDetailBorrowerSlip)
router.delete('/cancel-borower/:id', authUserMiddleWare, borrowerSlipController.cancelBorrowerSlip)
router.get('/get-all-borrower-slip', authMiddleWare, borrowerSlipController.getAllBorrowerSlip) //amin get all borrower slip
//router.post('/delete-many', authMiddleWare, borrowerSlipController.deleteManyBorrowerSlip)
router.delete('/delete/:id', authMiddleWare, borrowerSlipController.deleteBorrowerSlip)

module.exports = router