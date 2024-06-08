const BorrowerSlipService = require('../services/BorrowerSlipService')
//const BlockPhone = require('../services/BlockPhoneService')

const createBorrowerSlip = async (req, res) => {
    try {
        const { userId, books, name, address, phoneNumber, totalAmount } = req.body
        if (!userId || !books || !name || !address || !phoneNumber || !totalAmount) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await BorrowerSlipService.createBorrowerSlip(req.body)
        return res.status(response.status === 'OK' ? 200 : 400).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

//
const getAllUserSlip = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await BorrowerSlip.getAllUserSlip(userId)
        return res.status(response.status === 'OK' ? 200 : 400).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }

}

const getDetailBorrowerSlip = async (req, res) => {
    try {
        const bSlipId = req.params.id
        if (!bSlipId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The borrower Slip id is required'
            })
        }
        const response = await BorrowerSlipService.getDetailBorrowerSlip(bSlipId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

const cancelBorrowerSlip = async (req, res) => {
    try {
        const booksData = req.body.books
        const bSlipId = req.body.orderId
        if (bSlipId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The borrower slip id is required'
            })
        }
        const response = await BorrowerSlipService.cancelOrderDetails(bSlipId, booksData)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }

}

const getAllBorrowerSlip = async (req, res) => {
    try {
        const data = await BorrowerSlipService.getAllBorrowerSlip()
        return res.status(200).json(data)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }

}

/*const deleteManyBorrowerSlip = async (req, res) => {
    try {

    } catch (e) {
        return res.status(404).json({
        message: e.message
    })
}
    
}*/

const deleteBorrowerSlip = async (req, res) => {
    try {
        const bSlipId = req.params.id
        if (!bSlipId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The borrower slip id is required'
            })
        }
        const response = await BorrowerSlipService.deleteBorrowerSlip(bSlipId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

const updateState = async (req, res) => {
    try {
        const bSlipId = req.params.id;
        const { newStatus } = req.body;

        if (!newStatus) {
            return res.status(400).json({
                status: 'ERR',
                message: 'New status is required'
            });
        }

        const response = await BorrowerSlipService.updateStatus(bSlipId, newStatus)
        return res.status(response.status === 'OK' ? 200 : 400).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

module.exports = {
    createBorrowerSlip,
    getAllUserSlip,
    getDetailBorrowerSlip,
    cancelBorrowerSlip,
    getAllBorrowerSlip,
    //deleteManyBorrowerSlip,
    deleteBorrowerSlip,
    updateState
}
