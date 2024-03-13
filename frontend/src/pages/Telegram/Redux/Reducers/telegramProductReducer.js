import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "telegramProducts",
    initialState: {
        initData: {
            title: "",
            categoryId: "",
            price: "",
            count: "",
            free: false,
            file: null
        },
        selectedProduct: {
            title: "",
            category: "",
            price: "",
            count: "",
            free: false,
        },
        products: [],
        categories: [],
        isLoading: false,
        isOpen: false,
        currentProductId: null
    },
    reducers: {
        getProducts: (state) => {
            state.isLoading=true
        },
        getProductsSuccess: (state, action) => {
            state.isLoading = false
            state.products = action.payload.products
        },
        getCategories: (state) => {
            state.isLoading=true
        },
        getCategoriesSuccess: (state, action) => {
            state.isLoading = false
            state.categories = action.payload.res
        },
        setInitData: (state, action) => {
            state.initData[action.payload.field] = action.payload.value
        },
        saveProduct: (state, action) => {
            state.isLoading = true
        },
        getInfo: (state, action) => {
            state.isLoading = true
        },
        getInfoSuccess: (state, action) => {
            state.selectedProduct = {
                title: action.payload.title,
                category: action.payload.category.title,
                price: action.payload.price,
                count: action.payload.count,
                free: action.payload.free,
                attachmentId: action.payload.attachment.id,
            }
        },
        setCurrentProduct: (state, action) => {
            state.currentProductId = action.payload
        },
        fillInitData: (state, action) => {
            state.isLoading = true
        },
        fillInitDataSuccess: (state, action) => {
            state.initData.title = action.payload.title
            state.initData.categoryId = action.payload.category.id
            state.initData.price = action.payload.price
            state.initData.count = action.payload.count
            state.initData.free = action.payload.free
        },
        editProduct: (state, action) => {
            state.isLoading=true
        },
        deleteProduct: (state, action) => {
            state.isLoading = true
        },
        clearInitData: (state, action) => {
            state.initData = {
                title: "",
                categoryId: "",
                price: "",
                count: "",
                free: false,
                file: null
            }
        }
    }
})
export const telegramProductModel = {...slice.actions}

export default slice.reducer