import {createSlice} from "@reduxjs/toolkit";

const productCategoryReducer = createSlice({
    initialState: {
        openModal: false,
        template: null,
        name: "",
        productCategories: [],
        itemForProductCategoryEdit: "",
        error: "",
    },
    name: "productCategory",
    reducers: {
        handleOpen: (state, action) => {
            state.openModal = true;
        },
        handleClose: (state, action) => {
            state.openModal = false;
            state.title = "";
            state.itemForProductCategoryEdit = "";
        },
        getProductCategories: (state, action) => {
        },
        getProductCategoriesSuccess: (state, action) => {
            state.productCategories = action.payload.res;
        },
        yourActionFailureDealers: (state, action) => {
            state.error = action.payload
        },
        handleName: (state, action) => {
            state.name = action.payload
        },
        changeModal: (state, action) => {
            state.openModal = action.payload
        },
        resetAllProductCategoryData: (state, action) => {
            state.itemForProductCategoryEdit = "";
            state.name = "";
        },
        saveProductCategory: (state, action) => {
            action.payload = {
                data: {
                    name: state.name,
                },
                loadingButton: action.payload
            }
        },
        editProductCategory: (state, action) => {
            state.itemForProductCategoryEdit = action.payload
            state.openModal = true;
            state.name = action.payload.name;
        },

    },
});

export const productCategoryActions = {...productCategoryReducer.actions};
export default productCategoryReducer.reducer;
