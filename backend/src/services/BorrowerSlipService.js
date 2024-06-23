const BorrowerSlip = require("../models/BorrowerSlipModel")
const Book = require("../models/BookModel")
const UserService = require("../services/UserService")
const BlockedPhone = require("../models/BlockedPhoneModel")
const EmailService = require("../services/EmailService")
const User = require("../models/UserModel")

const createBorrowerSlip = (newBorrowerSlip) => {
    return new Promise(async (resolve, reject) => {
        const { userId, name, phoneNumber, address, books, totalAmount, email } = newBorrowerSlip
        try {
            const checkBlockedUser = await UserService.isBlockedUser(userId)
            if (checkBlockedUser) {
                return resolve({
                    status: "ERR",
                    message: "User is blocked. Please check your borrower slip",
                    data: userId
                })
            }
            /**: check số lượng sách đang mượn và số sách hiện tại có vượt quá không */
            const borroweredSlips = await BorrowerSlip.find({
                userId: userId,
                state: { $in: [0, 1] }
            })

            //console.log(borroweredSlips)

            if (borroweredSlips.length > 0) {
                const count = borroweredSlips.reduce((count, slip) => {
                    return count + slip.totalAmount
                }, 0)
                if (count + totalAmount > 5) {
                    //console.log("t", count + totalAmount)
                    //console.log("count", count)
                    return resolve({
                        status: "ERR",
                        message: `Bạn đang mượn ${count} quyển, không thể mượn cùng lúc nhiều hơn 5`
                    })
                }
            }

            const dataToSave = books.map((book) => ({
                bookId: book.bookId._id,
                quantity: book.quantity
            }));

            /**Kiểm tra số lượng sách còn đủ không */
            for (const book of dataToSave) {
                const bookData = await Book.findOne({
                    _id: book.bookId,
                    quantityAvailable: { $lte: book.quantity }
                });
                if (bookData) {
                    return resolve({
                        status: "ERR",
                        message: `Không đủ số lượng sách ${bookData.name}`
                    });
                }
            }

            const updateBook = dataToSave.map(async (book) => {
                await Book.findOneAndUpdate(
                    {
                        _id: book.bookId,
                        quantityAvailable: { $gte: book.quantity }
                    },
                    {
                        $inc: {
                            quantityAvailable: -book.quantity,
                        }
                    },
                    { new: true }
                )
            })
            await Promise.all(updateBook)

            const createdBorrowerSlip = new BorrowerSlip({
                books,
                shippingAddress: {
                    name,
                    address,
                    phoneNumber
                },
                userId: userId,
                totalAmount
            })

            await createdBorrowerSlip.save()

            if (createdBorrowerSlip) {
                if (email) {
                    await EmailService.sendEmailCreateSlipBorrower(email, books)
                }
                resolve({
                    status: 'OK',
                    message: 'success',
                    data: createdBorrowerSlip
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const getAllUserSlip = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bSlip = await BorrowerSlip.find({
                userId: id
            }).sort({
                createdAt: -1, updatedAt: -1
            }).populate({
                path: 'books.bookId',
                select: 'name coverImg'
            })
            if (bSlip === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The borrower slip is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: bSlip
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const getDetailBorrowerSlip = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bSlip = await BorrowerSlip.findById(id).populate({
                path: 'books.bookId',
                select: 'name coverImg author category'
            })
            if (bSlip === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The borrower slip is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: bSlip
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const getByPhone = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ phoneNumber: phone })
            const bSlips = await BorrowerSlip.find({ userId: user._id })
            if (bSlips.length === 0) {
                return resolve({
                    status: 'ERR',
                    message: `${phone} chưa có phiếu mượn nào`
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: bSlips
            })
        } catch (e) {
            reject(e)
        }
    })
}

const cancelBorrow = (id) => { //id của slip khác bookId
    return new Promise(async (resolve, reject) => {
        try {
            const slip = await BorrowerSlip.findById(id)
            if (slip.state !== 0) {
                return resolve({
                    status: "ERR",
                    message: "Không thể hủy sau khi phiếu mượn đã được xác nhận"
                })
            }
            const books = slip.books
            const promises = books.map(async (book) => {
                const bookData = await Book.findOneAndUpdate(
                    {
                        bookId: book.bookId,
                        //selled: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            quantityAvailable: +book.quantity,
                            //selled: -order.amount
                        }
                    },
                    { new: true }
                )
                if (!bookData) {
                    return {
                        status: 'ERR',
                        message: `sách có id ${book.bookId} không còn tồn tại`
                    }
                } else {
                    return {
                        status: 'OK',
                        id: book.bookId
                    }
                }
            })
            await Promise.all(promises)
            //console.log("chưa xóa")
            await BorrowerSlip.findByIdAndDelete(id, { new: true })
            //console.log("xóa roài địu")
            resolve({
                status: "OK",
                message: "cancel borrower success"
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllBorrowerSlip = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allBSlip = await BorrowerSlip.find().sort({ createdAt: -1, updatedAt: -1 })
            return resolve({
                status: 'OK',
                message: 'Success',
                data: allBSlip
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteMany = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await BorrowerSlip.deleteMany({ _id: ids })
            return resolve({
                status: 'OK',
                message: 'Delete borrower slip success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteBorrowerSlip = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBSlip = await BorrowerSlip.findOne({
                _id: id
            })
            if (checkBSlip === null) {
                return resolve({
                    status: 'ERR',
                    message: 'The borrower slip is not define'
                })
            }

            await BorrowerSlip.findByIdAndDelete(id, { new: true })
            resolve({
                status: 'OK',
                message: 'Delete borrower success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateState = (id, newState) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bSlip = await BorrowerSlip.findById(id)
            if (!bSlip) {
                resolve({
                    status: "ERR",
                    message: "borrower slip is not define"
                })
            }
            const listBook = bSlip.books
            const currentState = bSlip.state
            const user = await User.findById(bSlip.userId)

            const validTransitions = {
                0: [1, 2],      // PENDING (0) -> BORROWING (1) hoặc RETURN(2)
                1: [2, 3],   // BORROWING (1) -> RETURNED (2) hoặc OVERDUE (3)
                2: [],      //BORROWING(2)
                3: [2]       // OVERDUE (3) -> RETURNED (2)
            };

            //0 chờ 1 mượn 2 trả 3 quá hạn
            if (!validTransitions[currentState]?.includes(newState)) {
                return resolve({
                    status: 'ERR',
                    message: `Cannot transition state from ${currentState} to ${newState}`,
                    data: currentState
                });
            }

            if (newState === 3) {
                await BlockedPhone.create({ phoneNumber: user.phoneNumber })
            } else if (newState === 2) {
                if (currentState === 3) {
                    const p = await BlockedPhone.findOne({ phoneNumber: bSlip.phoneNumber })
                    if (p) {
                        await BlockedPhone.findOneAndDelete({
                            phoneNumber: bSlip.phoneNumber
                        },
                            {
                                new: true
                            })
                    }
                }
                const promises = listBook.map(async (book) => {
                    const bookData = await Book.findOneAndUpdate(
                        {
                            bookId: book.bookId,
                        },
                        {
                            $inc: {
                                quantityAvailable: +book.quantity,
                                //selled: -order.amount
                            }
                        },
                        { new: true }
                    )
                    if (!bookData) {
                        return {
                            status: 'ERR',
                            message: `sách có id ${book.bookId} không còn tồn tại`
                        }
                    } else {
                        return {
                            status: 'OK',
                            id: book.bookId
                        }
                    }
                })
                await Promise.all(promises)
                bSlip.returnDate = new Date()
            }
            bSlip.state = newState
            await bSlip.save()
            if (bSlip.state !== newState) {
                return resolve({
                    status: "ERR",
                    message: "Failed to update status"
                });
            }
            resolve({
                status: "OK",
                message: "update complete",
                data: bSlip
            })
        } catch (e) {
            reject({
                status: "ERR",
                message: "update fail"
            })
        }
    })
}

const callSlipStatistic = (year) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tạo mảng để lưu tổng số phiếu theo tháng
            const monthlySlipStats = [];

            // Tạo biến tổng số phiếu và tổng số sách được mượn
            let totalBorrowerSlip = 0;
            let totalBorrowedBook = 0;

            for (let month = 1; month <= 12; month++) {
                // Xử lý điều kiện date trước khi thống kê từng tháng
                let dateCondition;

                if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
                    dateCondition = [new Date(`${year}-${month}-01`), new Date(`${year}-${month}-31`)];
                } else if ([4, 6, 9, 11].includes(month)) {
                    dateCondition = [new Date(`${year}-${month}-01`), new Date(`${year}-${month}-30`)];
                } else if (month === 2) {
                    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                        dateCondition = [new Date(`${year}-02-01`), new Date(`${year}-02-29`)];
                    } else {
                        dateCondition = [new Date(`${year}-02-01`), new Date(`${year}-02-28`)];
                    }
                }

                const monthlyStats = await BorrowerSlip.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: dateCondition[0], $lte: dateCondition[1] }
                        }
                    },
                    {
                        $group: {
                            _id: '$state',
                            count: { $sum: 1 },
                            totalBooks: { $sum: '$totalAmount' }
                        }
                    }
                ]);

                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
                const monthName = monthNames[month - 1];

                let pending = 0, borrowing = 0, returned = 0, overdue = 0, monthlyBooks = 0;

                monthlyStats.forEach(stat => {
                    if (stat._id === 0) pending = stat.count;
                    if (stat._id === 1) borrowing = stat.count;
                    if (stat._id === 2) returned = stat.count;
                    if (stat._id === 3) overdue = stat.count;
                    monthlyBooks += stat.totalBooks;
                });

                totalBorrowerSlip += (pending + borrowing + returned + overdue);
                totalBorrowedBook += monthlyBooks;

                monthlySlipStats.push({
                    month: monthName,
                    pending: pending,
                    borrowing: borrowing,
                    returned: returned,
                    overdue: overdue
                });
            }

            resolve({
                status: "OK",
                message: "complete statistic",
                data: {
                    totalBorrowerSlip: totalBorrowerSlip,
                    totalBorrowedBook: totalBorrowedBook,
                    monthlySlipStats: monthlySlipStats
                }
            });

        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createBorrowerSlip,
    getAllUserSlip,
    getDetailBorrowerSlip,
    cancelBorrow,
    getByPhone,
    getAllBorrowerSlip,
    deleteMany,
    deleteBorrowerSlip,
    updateState,
    callSlipStatistic
}

