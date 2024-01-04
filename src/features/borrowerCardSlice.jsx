import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fakeData = {
    listBook: [
        { bookId: 'NNA001', name: 'Tôi thấy hoa vàng trên cỏ xanh', quantity: 1, coverImg: 'https://upload.wikimedia.org/wikipedia/vi/3/3d/T%C3%B4i_th%E1%BA%A5y_hoa_v%C3%A0ng_tr%C3%AAn_c%E1%BB%8F_xanh.jpg' },
        { bookId: 'L10', name: 'Bước chậm lại giữa thế gian vội vã', quantity: 2, coverImg: 'https://salt.tikicdn.com/cache/w1200/ts/product/7a/18/8e/2f70de3ea7eec9c34f55e402254e27ed.jpg' }
    ],
    count: 3
};

const initialState = {
    listBook: [],
    count: 0
};

export const fetchBorrowerCard = createAsyncThunk(
    'borrowerCard/fetchBorrowerCard',
    async (phoneNumber) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        //return data;
        return fakeData
    }
);

export const addBookToCard = createAsyncThunk(
    'borrowerCard/addBookToCard',
    async ({ phoneNumber, bookId, quantity }) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        //return data;
        return fakeData
    }
);

const borrowerCardSlice = createSlice({
    name: 'borrowerCard',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBorrowerCard.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(addBookToCard.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    }
});

export default borrowerCardSlice.reducer;
