import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const fakeBookData = [
    { bookId: 'NNA001', categoryName: 'Nguyễn Ngọc Ánh', author: 'Nguyễn Ngọc Ánh', name: 'Tôi thấy hoa vàng trên cỏ xanh', quantityTotal: 7, quantityAvailabel: 5, publisher: 'Kim Đồng', coverImg: 'https://upload.wikimedia.org/wikipedia/vi/3/3d/T%C3%B4i_th%E1%BA%A5y_hoa_v%C3%A0ng_tr%C3%AAn_c%E1%BB%8F_xanh.jpg' },
    { bookId: 'NNA002', categoryName: 'Nguyễn Ngọc Ánh', author: 'Nguyễn Ngọc Ánh', name: 'Tôi là Beto', quantityTotal: 5, quantityAvailabel: 2, publisher: 'Kim Đồng', coverImg: 'https://upload.wikimedia.org/wikipedia/vi/9/98/T%C3%B4i_l%C3%A0_B%C3%AAt%C3%B4.jpg' },
    { bookId: 'L10', categoryName: 'Tản Văn', author: 'Hae Min', name: 'Bước chậm lại giữa thế gian vội vã', quantityTotal: 3, quantityAvailabel: 1, publisher: 'Nhã Nam', coverImg: 'https://salt.tikicdn.com/cache/w1200/ts/product/7a/18/8e/2f70de3ea7eec9c34f55e402254e27ed.jpg' },
    { bookId: 'A1-20', categoryName: 'Tiểu sử - hồi ký', author: 'Phan Việt', name: 'Xuyên Mỹ', quantityTotal: 1, quantityAvailabel: 1, publisher: 'Dân Trí', coverImg: 'https://salt.tikicdn.com/cache/w1200/media/catalog/product/b/a/bat-hanh-la-mot-tai-san-xuyen-my.jpg' },
    { bookId: 'A1-21', categoryName: 'Tiểu sử - hồi ký', author: 'Phan Việt', name: 'Về Nhà', quantityTotal: 1, quantityAvailabel: 0, publisher: 'Nhã Nam', coverImg: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630678166i/34816365.jpg' },
    { bookId: 'F1-24', categoryName: 'Kinh dị', author: 'Suzuki Koji', name: 'Vòng xoáy chết', quantityTotal: 3, quantityAvailabel: 2, publisher: 'Nhã Nam', coverImg: 'https://salt.tikicdn.com/cache/w1200/media/catalog/product/v/o/vong-xoay-chet_1.jpg' },
    { bookId: 'F1-25', categoryName: 'Kinh dị', author: 'Suzuki Koji', name: 'Vòng xoáy chết 2', quantityTotal: 3, quantityAvailabel: 2, publisher: 'Nhã Nam', coverImg: 'https://salt.tikicdn.com/cache/w1200/media/catalog/product/v/o/vong-xoay-chet_1.jpg' }
]

const fakeBook = [
    { bookId: 'NNA003', categoryName: 'Nguyễn Ngọc Ánh', author: 'Nguyễn Ngọc Ánh', name: 'Kính vạn hoa 4', quantityTotal: 2, quantityAvailabel: 2, publisher: 'Kim Đồng', coverImg: 'https://sachtiengviet.com/cdn/shop/products/e22340ac820731a401bd7fac05dcfe9d.jpg?v=1700783823' },
]

const data = { data: 1 }

const booksAdapter = createEntityAdapter({
    selectId: book => book.bookId,
})

const initialState = booksAdapter.getInitialState()

export const fetchBooks = createAsyncThunk(
    'books/fectchBooks',
    async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        //return response.data
        const res = fakeBookData
        return res
    })

export const addNewBook = createAsyncThunk(
    'books/addNewBook',
    async initialBook => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        //return response.data
        return fakeBook
    }
)

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    async bookId => {
        console.log("xóa dp", bookId)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        //const res = await request.delete(`book/${bookId}`)
        //return res.data
        return bookId
    }
)

export const editBook = createAsyncThunk(
    'book/updateBook',
    async bookData => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        //const res = await request.put(`book/${bookId}`, bookData)
        //return res.data
        return bookData
    }
)

export const searchBook = createAsyncThunk(
    'books/searchBook',
    async keyword => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        //return response.data
        console.log(2222)
        return fakeBook
    }
)

export const filterBook = createAsyncThunk(
    'books/filterBook',
    async category => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        //return response.data
        console.log(2222)
        return fakeBook
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBooks.fulfilled, (state, action) => {
                console.log("get all book")
                booksAdapter.setAll(state, action.payload)
            })
            .addCase(addNewBook.fulfilled, booksAdapter.addOne)
            .addCase(searchBook.fulfilled, (state, action) => {
                booksAdapter.updateMany(state, action.payload)
            })
            .addCase(filterBook.fulfilled, (state, action) => {
                booksAdapter.updateMany(state, action.payload)
            })
            //.addCase(deleteBook.fulfilled, (state, action) => {

            //    booksAdapter.updateMany(state, action.payload)
            //})
            .addCase(editBook.fulfilled, (state, action) => {
                const updateBook = action.payload;
                const existingBook = state.entities[updateBook.bookId]

                if (existingBook) {
                    booksAdapter.updateOne(state, { id: existingBook.id, changes: updateBook })
                }
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                const deletedBookId = action.payload.data;

                // Sử dụng `removeOne` để xóa sách từ trạng thái Redux
                console.log('lỗi ko')
                booksAdapter.removeOne(state, deletedBookId);
                console.log(booksAdapter)
            });
    }
})

export default booksSlice.reducer

export const {
    selectAll: selectAllBooks,
    selectById: selectBookById,
    selectIds: selectBookIds
} = booksAdapter.getSelectors(state => state.books)