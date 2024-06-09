const Order = require("../models/OrderModel")
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")
const { updateBook } = require("./BookService")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        //const { orderItems,paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone,user, isPaid, paidAt,email } = newOrder
        const { orderItems, itemsPrice, name, address, phoneNumber, userId, note } = newOrder
        try {
            const promises = orderItems.map(async (item) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: item.productId,
                        quantity: { $gte: item.quantity }
                    }
                )
                if (productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }
                else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: item.productId
                    }
                }
            })
            const results = await Promise.all(promises)
            const outOfStockProduct = results && results.filter((item) => item.id)
            if (outOfStockProduct.length > 0) {
                const arrId = []
                outOfStockProduct.forEach((item) => {
                    arrId.push(item.id)
                })
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${arrId.join(',')} khong du hang`
                })
            } else {
                const updateProduct = orderItems.map(async (item) => {
                    await Product.findOneAndUpdate(
                        {
                            _id: item.productId,
                            quantity: { $gte: item.quantity }
                        },
                        {
                            $inc: {
                                quantity: +item.quantity,
                                //selled: -order.amount
                            }
                        },
                    )
                })
                await Promise.all(updateProduct)

                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        name,
                        address,
                        phoneNumber
                    },
                    // paymentMethod,
                    itemsPrice,
                    //shippingPrice,
                    //totalPrice,
                    user: userId,
                    note: note
                    //isPaid, paidAt
                })
                if (createdOrder) {
                    //await EmailService.sendEmailCreateOrder(email, orderItems)
                    resolve({
                        status: 'OK',
                        message: 'success',
                        data: createdOrder
                    })
                }
            }
        } catch (e) {
            //   console.log('e', e)
            reject(e)
        }
    })
}

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orders = await Order.find({
                user: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (orders === null) {
                resolve({
                    status: 'ERR',
                    message: 'The  not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: orders
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(id).populate('orderItems.productId');
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const cancelOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(id)
            if (order.status !== "pending") {
                resolve({
                    status: "ERR",
                    message: "Không thể hủy đơn sau khi đơn đã được ship"
                })
                return
            }
            const promises = data.map(async (item) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: item.productId,
                        //selled: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            quantity: +item.quantity,
                            //selled: -order.amount
                        }
                    },
                    { new: true }
                )
                if (!productData) {
                    return {
                        status: 'Ok',
                        message: `sản phẩm có id ${item.productId} không còn tồn tại`
                    }
                } else {
                    return {
                        status: 'OK',
                        id: item.productId
                    }
                }
            })
            await Promise.all(promises)
            await Order.findByIdAndDelete(id, { new: true })
            resolve({
                status: "OK",
                message: "Hủy order thành công"
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyOrder = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Order.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({
                _id: orderId
            })
            if (checkOrder === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not define'
                })
            }

            await Product.findByIdAndDelete(orderId, { new: true })
            resolve({
                status: 'OK',
                message: 'Delete order success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateStatus = (orderId, newStatus) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(orderId)
            if (!order) {
                resolve({
                    status: "ERR",
                    message: "order is not define"
                })
            }
            const items = order.orderItems
            const currentStatus = order.status
            const validTransitions = {
                'pending': ['shipped', 'returned'],
                'shipped': ['returned'],
                'returned': []
            };

            if (!validTransitions[currentStatus].includes(newStatus)) {
                return resolve({
                    status: 'ERR',
                    message: `Cannot transition status from ${currentStatus} to ${newStatus}`,
                    data: currentStatus
                });
            }

            if (newStatus === 'returned' && (currentStatus === 'pending' || currentStatus === 'shipped')) {
                const promises = items.map(async (item) => {
                    const productData = await Product.findOneAndUpdate(
                        {
                            _id: item.productId,
                            //selled: { $gte: order.amount }
                        },
                        {
                            $inc: {
                                quantity: +item.quantity,
                                //selled: -order.amount
                            }
                        },
                        { new: true }
                    )
                    if (!productData) {
                        resolve({
                            status: 'ERR',
                            message: `sản phẩm có id ${item.productId} không còn tồn tại`
                        })
                    } else {
                        return {
                            status: 'OK',
                            id: item.productId
                        }
                    }
                })
                await Promise.all(promises)
            }
            order.status = newStatus
            await order.save()
            if (order.status !== newStatus) {
                return resolve({
                    status: "ERR",
                    message: "Failed to update status"
                });
            }
            resolve({
                status: "OK",
                message: "update complete",
                data: order
            })
        } catch (e) {
            reject({
                status: "ERR",
                message: "update fail"
            })
        }
    })
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    deleteManyOrder,
    deleteOrder,
    updateStatus
}