const mongoose = require('mongoose')

const blockPhoneSchema = new mongoose.Schema(
    {
        phoneNumber: { type: String, required: true, unique: true },
    },
    { _id: false }
)
const BlockPhone = mongoose.model('BlockPhone', blockPhoneSchema);

module.exports = BlockPhone