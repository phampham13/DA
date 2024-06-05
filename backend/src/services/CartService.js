const Cart = require("../models/CartModel")
const User = require("~/models/UserModel")

const createCart = async (userId) => {
    try {
        const cart = new Cart({ userId });
        await cart.save();
        return cart
    } catch (error) {
        return {
            status: 'ERR',
            message: 'Failed to create cart',
            error: error.message
        };
    }
};

const deleteCart = async (userId) => {
    try {
        const cart = await Cart.findOneAndDelete({ userId: userId });
        if (!cart) {
            return {
                status: 'ERR',
                message: 'Cart not found for the user'
            };
        }
        return {
            status: 'OK',
            message: 'Delete cart success'
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: 'Failed to delete cart',
            error: error.message
        };
    }
}

const updateCart = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOneAndUpdate(
                { userId },
                { $set: { products: data.products } },
                { new: true }
            )

            if (!cart) {
                resolve({
                    status: 'ERR',
                    message: 'Cart not found'
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Cart updated successfully',
                    data: cart
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getDetail = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOne({ userId }).populate('products.productId');
            if (!cart) {
                resolve({
                    status: 'ERR',
                    message: 'Cart not found'
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: cart
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createCart,
    deleteCart,
    updateCart,
    getDetail
};