import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'
import userReducer from './slides/userSlide'
import orderReducer from './slides/orderSlide'
import booksReducer from './slides/booksSlice'
import borrowerCardReducer from './slides/borrowerCardSlice'

export default configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
    books: booksReducer,
    borrowerCard: borrowerCardReducer
  }
})