const UserRouter = require('./userRoute')
const ProductRouter = require('./productRoute')
const BookCategoryRouter = require('./bookCategoryRoute')
const BookRouter = require('./bookRoute')
const CartRouter = require('./cartRoute')

const routes = (app) => {
    app.use('/users', UserRouter)
    app.use('/products', ProductRouter)
    app.use('/bookCategories', BookCategoryRouter)
    app.use('/books', BookRouter)
    app.use('/cart', CartRouter)
}

module.exports = routes