const UserRouter = require('./userRoute')
const ProductRouter = require('./productRoute')
const BookCategoryRouter = require('./bookCategoryRoute')
const BookRouter = require('./bookRoute')
const CartRouter = require('./cartRoute')
const CardRouter = require('./cardRoute')
const BorrowerSlip = require('./borrowerSlipRoute')
const OffBorrowerSlip = require('./offBorrowerSlipRoute')

const routes = (app) => {
    app.use('/users', UserRouter)
    app.use('/products', ProductRouter)
    app.use('/bookCategories', BookCategoryRouter)
    app.use('/books', BookRouter)
    app.use('/cart', CartRouter)
    app.use('/card', CardRouter)
    app.use('/borrowerSlip', BorrowerSlip)
    app.use('/offBorrowerSlip', OffBorrowerSlip)
}

module.exports = routes