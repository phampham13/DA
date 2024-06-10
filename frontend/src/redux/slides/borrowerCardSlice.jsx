import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    totalAmount: 0
}

const borrowerCardSlice = createSlice({
    name: 'borrowerCard',
    initialState,
    reducers: {
        updateCard: (state, action) => {
            state.books = action.payload.books
            state.totalAmount = action.payload.totalAmount
        },
        addBookToCard: (state, action) => {
            const book = action.payload

        },
        downQuantity: (state, action) => {
            const id = action.payload
            const bookIndex = state.books.findIndex(book => book.bookId._id === id);

            if (bookIndex !== -1 && state.books[bookIndex].quantity > 0) {
                state.books[bookIndex].quantity -= 1;
                state.totalAmount -= 1;
            }
        },
        upQuantity: (state, action) => {
            const id = action.payload;
            const bookIndex = state.books.findIndex(book => book.bookId._id === id);

            if (bookIndex !== -1) {
                state.books[bookIndex].quantity += 1;
                state.totalAmount += 1;
            }
        },
        deleteBook: (state, action) => {
            const id = action.payload;
            const bookIndex = state.books.findIndex(book => book.bookId._id === id);

            if (bookIndex !== -1) {
                state.totalAmount -= state.books[bookIndex].quantity;
                state.books.splice(bookIndex, 1);
            }
        },
        resetCard: (state) => {
            state.books = []
            state.totalAmount = 0
        }
    }
})

export const { updateCard, addBookToCard, downQuantity, upQuantity, deleteBook, resetCard } = borrowerCardSlice.actions

export default borrowerCardSlice.reducer
