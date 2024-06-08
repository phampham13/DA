const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        //const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone } = req.body
        const { orderItems, fullName, address, phoneNumber } = req.body
        if (!orderItems || !fullName || !address || !phoneNumber) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e.message
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.deleteOrder(orderId)
        return res.status(200).json(response)
    } catch {
        return res.status(404).json({
            message: " order controller delete Error"
        })
    }
}

const deleteManyOrder = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await OrderService.deleteManyOrder(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

const updateStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { newStatus } = req.body;

        if (!newStatus) {
            return res.status(400).json({
                status: 'ERR',
                message: 'New status is required'
            });
        }

        const response = await OrderService.updateStatus(orderId, newStatus)
        return res.status(response.status === 'OK' ? 200 : 400).json(response)
    } catch (e) {
        return res.status(404).json({
            message: " product controller update Error"
        })
    }
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
    deleteOrder,
    deleteManyOrder,
    updateStatus
}