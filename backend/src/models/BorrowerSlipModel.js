const mongoose = require('mongoose')

const borrowerSlipSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        /* state: 0 Chờ xác nhận, 1 Đang mượn, 2 Đã trả, 3 Quá hạn */
        state: { type: Number, default: 0, required: true },
        delivery: {
            receiverName: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            address: { type: String, required: true }
        },
        books: [{
            bookId: { type: String, ref: 'Book', required: true },
            quantity: { type: Number, required: true }
        }],
        returnDate: { type: Date },
        //borrowedDays: {type: Number}
    },
    {
        timestamps: true,
    }
);

// Tạo một pre-hook để tự động tính toán returnDate và penalty
borrowerSlipSchema.pre('save', function (next) {
    // Nếu state là 1 (Đang mượn) và returnDate chưa được đặt
    if (!this.returnDate) {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        // hạn trả sách là 50 ngày kể từ khi phiếu mượn được tạo
        const returnDate = new Date(currentDate.getTime() + (50 * 24 * 60 * 60 * 1000));
        this.returnDate = returnDate;
    }
    next();
});

const BorrowerSlip = mongoose.model('BorrowerSlip', borrowerSlipSchema);

module.exports = BorrowerSlip;