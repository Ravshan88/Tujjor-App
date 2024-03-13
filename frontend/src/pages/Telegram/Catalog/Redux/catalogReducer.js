import {createSlice} from "@reduxjs/toolkit";

const catalogReducer = createSlice({
    name: "catalog",
    initialState: {
        catalogs: [],
        catalogProducts: [],
        catalogProductsForAddPage: [],
        productCategories: [],
        name: "",
        catalogQuickSearch: "",
        catalogProductQuickSearch: "",
        selectedProductCategory: "",
        currentCatalogId: "",
        currentCatalogName: "",
        error: "",
        productAbout: {}
    },
    reducers: {
        clearData: (state, action) => {
          state.catalogProductQuickSearch = "";
          state.selectedProductCategory = "";
        },
        handleName: (state, action) => {
            state.name = action.payload
        },
        handleCatalogQuickSearch: (state, action) => {
            state.catalogQuickSearch = action.payload
        },
        handleCatalogProductQuickSearch: (state, action) => {
            state.catalogProductQuickSearch = action.payload
            action.payload = {
                catalogProductQuickSearch: state.catalogProductQuickSearch,
                selectedProductCategory: state.selectedProductCategory!==""?state.selectedProductCategory:null,
                currentCatalogId: state.currentCatalogId,
            }
        },
        handleSelectProductCategory: (state, action) => {
            state.selectedProductCategory = action.payload
            action.payload = {
                catalogProductQuickSearch: state.catalogProductQuickSearch,
                selectedProductCategory: state.selectedProductCategory!==""?state.selectedProductCategory:null,
                currentCatalogId: state.currentCatalogId,
            }
        },
        handleCurrentCatalogId: (state, action) => {
            state.currentCatalogId = action.payload
        },
        handleCurrentCatalogName: (state, action) => {
            state.currentCatalogName = action.payload
        },
        getCatalogs: (state, action) => {
            action.payload = {
                catalogProductQuickSearch: state.catalogProductQuickSearch,
                selectedProductCategory: state.selectedProductCategory!==""?state.selectedProductCategory:null,
                currentCatalogId: state.currentCatalogId,
            }
        },
        getCatalogsSuccess: (state, action) => {
            state.catalogs = action.payload.res
        },
        saveCatalog: (state, action) => {
            action.payload = {
                data: {
                    name: state.name,
                },
                loadingButton: action.payload
            }
        },
        resetAllCatalogData: (state, action) => {
            state.name = ""
        },
        yourActionFailureCatalogs: (state, action) => {
            state.error = action.payload
        },
        getCatalogProducts: (state, action) => {
            action.payload = {
                catalogProductQuickSearch: state.catalogProductQuickSearch,
                selectedProductCategory: state.selectedProductCategory!==""?state.selectedProductCategory:null,
                currentCatalogId: state.currentCatalogId,
            }
        },
        getCatalogProductsSuccess: (state, action) => {
            state.catalogProducts = action.payload.res
        },
        deleteCatalogProduct: (state, action) => {
        },
        deleteCatalogProductSuccess: (state, action) => {

        },
        getProductCategories: (state, action) => {
        },
        getProductCategoriesSuccess: (state, action) => {
            state.productCategories = action.payload.res
        },
        getProductAbout: (state, action) => {
        },
        getProductAboutSuccess: (state, action) => {
            state.productAbout = action.payload.res
        },
        getCatalogProductForProductAddPage: (state, action) => {
            action.payload = {
                catalogProductQuickSearch: state.catalogProductQuickSearch,
                selectedProductCategory: state.selectedProductCategory!==""?state.selectedProductCategory:null,
                currentCatalogId: state.currentCatalogId,
            }
        },
        getCatalogProductForProductAddPageSuccess: (state, action) => {
            state.catalogProductsForAddPage = action.payload.res
        },
        getCatalogProductForProductAddPageWithFilter: (state, action) => {

        },
        getCatalogProductForProductAddPageWithFilterSuccess: (state, action) => {
            state.catalogProductsForAddPage = action.payload.res
        },
        addProductToCatalog: (state, action) => {
        }
    }
});

export const catalogActions = {...catalogReducer.actions};
export default catalogReducer.reducer;