const mongoose = require('mongoose')

const ProductSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
}, { _id: false })

const orderSchema = new mongoose.Schema({
    orderItems: [ProductSchema],
    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
    },
    //paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //isPaid: { type: Boolean, default: false },
    //paidAt: { type: Date },
    //isDelivered: { type: Boolean, default: false },
    //deliveredAt: { type: Date },
},
    {
        timestamps: true,
    }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order