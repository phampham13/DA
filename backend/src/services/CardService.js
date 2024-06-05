const Card = require("~/models/CardModel");

const createCard = async (userId) => {
    try {
        const card = await Card.create({ userId })
        return card
    } catch (error) {
        return {
            status: 'ERR',
            message: 'Failed to create card',
            error: error.message
        };
    }
};

const deleteCard = async (userId) => {
    try {
        const card = await Card.findOneAndDelete({ userId: userId });
        if (!card) {
            return {
                status: 'ERR',
                message: 'Cart not found card for the user'
            };
        }
        return {
            status: 'OK',
            message: 'Delete card success'
        };
    } catch (error) {
        return {
            status: 'ERR',
            message: 'Failed to delete card',
            error: error.message
        };
    }
}

const updateCard = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const card = await Card.findOneAndUpdate(
                { userId },
                { $set: { products: data.products } },
                { new: true }
            )

            if (!card) {
                resolve({
                    status: 'ERR',
                    message: 'Card not found'
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Card updated successfully',
                    data: card
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
            const card = await Card.findOne({ userId }).populate('products.productId');
            if (!card) {
                resolve({
                    status: 'ERR',
                    message: 'Cart not found'
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: card
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createCard,
    deleteCard,
    updateCard,
    getDetail
};