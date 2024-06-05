import { configureStore } from '@reduxjs/toolkit'

import booksReducer from '../features/booksSlice'
import borrowerCardReducer from '../features/borrowerCardSlice'

export default configureStore({
  reducer: {
    books: booksReducer,
    borrowerCard: borrowerCardReducer
  }
})