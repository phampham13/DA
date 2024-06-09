const BorrowerSlip = require("../models/BorrowerSlipModel")
const Book = require("../models/BookModel")
const UserService = require("../services/UserService")
const BlockPhone = require("../models/BlockPhoneModel")

const createBorrowerSlip = (newBorrowerSlip) => {
    return new Promise(async (resolve, reject) => {
        const { userId, name, phoneNumber, address, books, totalAmount } = newBorrowerSlip
        try {
            const checkBlockedUser = await UserService.isBlockedUser(userId)
            //console.log(checkBlockedUser)
            if (checkBlockedUser) {
                resolve({
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

            console.log(borroweredSlips)

            if (borroweredSlips.length > 0) {
                const count = borroweredSlips.reduce((count, slip) => {
                    return count + slip.totalAmount
                }, 0)
                if (count + totalAmount > 5) {
                    console.log("t", count + totalAmount)
                    console.log("count", count)
                    resolve({
                        status: "ERR",
                        message: `Bạn đang mượn ${count} quyển, không thể mượn cùng lúc nhiều hơn 5`
                    })
                }
            }

            /**Kiểm tra số lượng sách còn đủ không */
            const promises = books.map(async (book) => {
                const bookData = await Book.findOne(
                    {
                        _id: book.bookId,
                        quantityAvailabel: { $gte: book.quantity }
                    }
                )
                if (bookData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }
                else {
                    resolve({
                        status: "ERR",
                        message: `Không đủ số lượng sách`
                    })
                    return
                    /*return {
                        status: 'OK',
                        message: 'ERR',
                        bookId: book.bookId
                    }*/
                }
            })
            await Promise.all(promises)

            const updateBook = books.map(async (book) => {
                await Book.findOneAndUpdate(
                    {
                        _id: book.bookId,
                        quantityAvailabel: { $gte: book.quantity }
                    },
                    {
                        $inc: {
                            quantityAvailabel: -book.quantity,
                        }
                    },
                    { new: true }
                )
            }
            )
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
                //await EmailService.sendEmailCreateOrder(email, orderItems)
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
                resolve({
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
                resolve({
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

const cancelBorrow = (id) => { //id của slip khác bookId
    return new Promise(async (resolve, reject) => {
        try {
            const slip = await BorrowerSlip.findById(id)
            if (slip.state !== 0) {
                resolve({
                    status: "ERR",
                    message: "Không thể hủy sau khi phiếu mượn đã được xác nhận"
                })
                return
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
                            quantityAvailabel: +book.quantity,
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
            console.log("chưa xóa")
            await BorrowerSlip.findByIdAndDelete(id, { new: true })
            console.log("xóa roài địu")
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
            resolve({
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
            resolve({
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
                resolve({
                    status: 'ERR',
                    message: 'The borrower slip is not define'
                })
            }

            const data = checkBSlip.books
            if (checkBSlip.state === 0 || checkBSlip.state === 1) { //trạng thái đang chờ hoặc đang mượn
                const promises = data.map(async (book) => {
                    const bookData = await Book.findOneAndUpdate(
                        {
                            bookId: book.bookId,
                            //selled: { $gte: order.amount }
                        },
                        {
                            $inc: {
                                quantityAvailabel: +book.quantity,
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

            //0 chờ 1 mượn 2 trả 3 quá hạn
            if ((currentState > newState) || (currentState == 3 && newState == 2)) {
                return resolve({
                    status: 'ERR',
                    message: `Cannot transition state from ${currentState} to ${newState}`,
                    data: currentState
                });
            }

            if (newState === 2 && (currentState === 1 || currentState === 0 || currentState === 3)) {
                const promises = listBook.map(async (book) => {
                    const bookData = await Book.findOneAndUpdate(
                        {
                            bookId: book.bookId,
                        },
                        {
                            $inc: {
                                quantityAvailabel: +book.quantity,
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

module.exports = {
    createBorrowerSlip,
    getAllUserSlip,
    getDetailBorrowerSlip,
    cancelBorrow,
    getAllBorrowerSlip,
    deleteMany,
    deleteBorrowerSlip,
    updateState
}

