const mongoose = require('mongoose')

const borrowerCardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    books: [{
        bookId: { type: String, ref: 'Book', required: true },
        quantity: { type: Number, required: true }
    }]
},
    {
        timestamps: true,
    }
);
const BorrowerCard = mongoose.model('BorrowerCard', borrowerCardSchema);

module.exports = BorrowerCard;