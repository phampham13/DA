const mongoose = require('mongoose')

const offBorrowerSlipSchema = new mongoose.Schema(
    {
        /* 1 Đang mượn, 2 Đã trả, 3 Quá hạn */
        state: { type: Number, default: 1, required: true },
        borrowerName: { type: String, required: true, required: true },
        phoneNumber: { type: String, required: true, required: true },
        address: { type: String, required: true },
        books: [{
            bookId: { type: String, ref: 'Book', required: true },
            quantity: { type: Number, required: true }
        }],
        returnDate: { type: Date },
        totalAmount: { type: Number, required: true }
        //borrowedDays: {type: Number}
    },
    {
        timestamps: true,
    }
);

offBorrowerSlipSchema.pre('create', function (next) {
    // Chỉ tính toán returnDate nếu phiếu mượn chưa có returnDate và state là 1 (Đang mượn)
    if (!this.returnDate && this.state === 1) {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        // Hạn trả sách là 50 ngày kể từ khi phiếu mượn được tạo
        const returnDate = new Date(currentDate.getTime() + (50 * 24 * 60 * 60 * 1000));
        this.returnDate = returnDate;
    }
    next();
});

const OffBorrowerSlip = mongoose.model('OffBorrowerSlip', offBorrowerSlipSchema);

module.exports = OffBorrowerSlip;
