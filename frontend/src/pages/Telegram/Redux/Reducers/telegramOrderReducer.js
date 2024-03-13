import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "telegramOrders",
    initialState: {
        initData: {
            title: "",
            categoryId: "",
            price: "",
            count: "",
            free: false,
            file: null
        },
        products: [],
        selectedProduct: null,
        isLoading: false,
    },
    reducers: {
        getProducts: (state) => {
            state.isLoading=true
        },
        getProductsSuccess: (state, action) => {
            state.isLoading = false
            state.products = action.payload.products
        },
        getProduct: (state, action) => {
            state.isLoading = true
        },
        getProductSuccess: (state, action) => {
            state.isLoading = false
            state.selectedProduct = action.payload
        },
    }
})
export const telegramOrderModel = slice.actions

export default slice.reducer