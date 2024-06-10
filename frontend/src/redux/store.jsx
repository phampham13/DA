import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlice'
import userReducer from './slides/userSlice'
import orderReducer from './slides/orderSlice'
import booksReducer from './slides/booksSlice'
import borrowerCardReducer from './slides/borrowerCardSlice'
import cartReducer from './slides/cartSlice'


export default configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer,
    books: booksReducer,
    borrowerCard: borrowerCardReducer,
    cart: cartReducer
  }
})