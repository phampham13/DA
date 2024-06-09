const express = require("express");
const router = express.Router()
const borrowerSlipController = require('../controllers/BorrowerSlipController');
const { authUserMiddleWare, authMiddleWare } = require('~/middlewares/authMiddleware')

router.post('/create', authUserMiddleWare, borrowerSlipController.createBorrowerSlip)
router.get('/get-user-slip/:id', authUserMiddleWare, borrowerSlipController.getAllUserSlip) //get all user's Slip
router.get('/get-detail-slip/:id', authUserMiddleWare, borrowerSlipController.getDetailBorrowerSlip)
router.delete('/cancel-borrower/:id', authUserMiddleWare, borrowerSlipController.cancelBorrow)
router.get('/get-all-borrower-slip', authMiddleWare, borrowerSlipController.getAllBorrowerSlip) //amin get all borrower slip
router.post('/delete-many', authMiddleWare, borrowerSlipController.deleteMany)
router.delete('/delete/:id', authMiddleWare, borrowerSlipController.deleteBorrowerSlip)
router.put('/update-state/:id', authMiddleWare, borrowerSlipController.updateState)

module.exports = router