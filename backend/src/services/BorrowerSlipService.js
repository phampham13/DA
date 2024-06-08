const BorrowerSlip = require("../models/BorrowerSlipModel")
const Book = require("../models/BookModel")
const UserService = require("../services/UserService")
const BlockPhone = require("../models/BlockPhoneModel")

const createBorrowerSlip = (newBorrowerSlip) => {
    return new Promise(async (resolve, reject) => {
        const { userId, name, phoneNumber, address, books, totalAmount } = newBorrowerSlip
        try {
            const checkBlockedUser = UserService.isBlockedUser(userId)
            if (checkBlockedUser) {
                resolve({
                    status: "ERR",
                    message: "User is blocked. Please check your borrower slip",
                    data: userId
                })
            }
            /**TO DO: check số lượng sách đang mượn và số sách hiện tại có vượt quá không */
            const promises = books.map(async (book) => {
                const bookData = await Book.findOneAndUpdate(
                    {
                        bookId: book.bookId,
                        quantityAvailabel: { $gte: book.quantity }
                    },
                    {
                        $inc: {
                            quantityAvailabel: -book.quantity,
                        }
                    },
                    { new: true }
                )
                if (bookData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    }
                }
                else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        bookId: book.bookId
                    }
                }
            })
            const results = await Promise.all(promises)
            const outOfStockBook = results && results.filter((book) => book.bookId)
            if (outOfStockProduct.length > 0) {
                const arrId = []
                outOfStockBook.forEach((item) => {
                    arrId.push(item.bookId)
                })
                resolve({
                    status: 'ERR',
                    message: `Sách có mã: ${arrId.join(',')} không còn đủ số lượng`
                })
            } else {
                const createdBorrowerSlip = await BorrowerSlip.create({
                    books,
                    shippingAddress: {
                        name,
                        address,
                        phoneNumber
                    },
                    user: userId,
                    totalAmount
                })
                if (createdOrder) {
                    //await EmailService.sendEmailCreateOrder(email, orderItems)
                    resolve({
                        status: 'OK',
                        message: 'success',
                        data: createdBorrowerSlip
                    })
                }
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
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (bSlip === null) {
                resolve({
                    status: 'ERR',
                    message: 'The borrower slip is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
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
            const bSlip = await BorrowerSlip.findById(id).populate('books.bookId');
            if (bSlip === null) {
                resolve({
                    status: 'ERR',
                    message: 'The borrower slip is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: order
            })
        } catch (e) {
            // console.log('e', e)
            reject(e)
        }
    })
}

const cancelBorrowerSlip = (id, data) => { //id của slip khác bookId
    return new Promise(async (resolve, reject) => {
        try {
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
                    resolve({
                        status: 'ERR',
                        message: `sách có id ${book.bookId} không còn tồn tại`
                    })
                } else {
                    return {
                        status: 'OK',
                        id: book.bookId
                    }
                }
            })
            const results = await Promise.all(promises)

            if (results && results.length == data.length) {
                await BorrowerSlip.findByIdAndDelete(id, { new: true })
            } else {
                resolve({
                    status: "ERR",
                    message: "cancel borrowe failed"
                })
            }
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

const deleteBorrowerSlip = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkBSlip = await BorrowerSlip.findOne({
                _id: orderId
            })
            if (checkOrder === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not define'
                })
            }

            listBook = checkBSlip.books
            if (checkBSlip.state === 0 || checkBSlip.state == 1) { //trạng thái đang chờ hoặc đang mượn
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
            BorrowerSlip.state = newState
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
    cancelBorrowerSlip,
    getAllBorrowerSlip,
    deleteBorrowerSlip,
    updateState
}

