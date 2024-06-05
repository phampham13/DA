// scheduler.js

const cron = require('node-cron')
const BorrowerSlip = require('../models/BorrowerSlipModel')
const User = require('../models/UserModel')

// Lập lịch chạy một lần mỗi ngày
const slipCheck = cron.schedule('0 0 * * *', async () => {
    try {
        // Lấy danh sách các phiếu mượn chưa trả và quá hạn
        const newOverdueBorrowerSlips = await BorrowerSlip.find({
            state: 1
        });


        for (const borrowerSlip of newOverdueBorrowerSlips) {
            const currentDate = new Date()
            const diffDays = (currentDate - borrowerSlip.returnDate) / (1000 * 60 * 60 * 24)
            if (diffDays > 0) {
                borrowerSlip.state = 3
                const user = await User.findOne({ id_: borrowerSlip.userId })
                user.state = 1
                await borrowerSlip.save()
                await user.save()
            }
        }
    } catch (error) {
        console.error('Error updating penalties:', error);
    }
});
slipCheck.start()
console.log('Scheduler started.') // Thêm dòng log để xác nhận rằng lịch trình đã được khởi động


//module.exports = {slipCheck} 
