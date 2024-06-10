import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: (state, action) => {
            state.products = action.payload.products
            state.totalAmount = action.payload.totalAmount
        },
        addProductToCart: (state, action) => {
            const product = action.payload

        }
    }
})

export const { updateCart, addProductToCart } = cartSlice.actions

export default cartSlice.reducer;