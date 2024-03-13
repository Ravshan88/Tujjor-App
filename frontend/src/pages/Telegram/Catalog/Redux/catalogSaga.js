import {put, takeEvery, call, select, delay} from "redux-saga/effects"
import {catalogActions} from "pages/Telegram/Catalog/Redux/catalogReducer";
import apiCall from "../../../../Config/apiCall"
import {ErrorNotify, SuccessNotify, WarningNotify} from "../../../../tools/Alerts";

// catalog code
function* getCatalogs(action) {
    try {
        const res = yield apiCall("/catalog", "GET", null)
        yield put(catalogActions.getCatalogsSuccess({res: res.data}))
    } catch (err) {
        yield put(catalogActions.yourActionFailureCatalogs(err.message));
    }
}

function* addCatalog(action) {
    if (action.payload.data.name.replaceAll(" ", "") === "") {
        ErrorNotify("Please fill all fields!")
    } else {
        const res = yield apiCall("/catalog", "POST", action.payload.data)
        SuccessNotify("Catalog added Successfully!")
        console.log(action.payload.data)
        yield put(catalogActions.resetAllCatalogData())
        yield call(getCatalogs)
    }
}

function* getCatalogsWithFilter(action) {
    if (action.payload.replaceAll(" ", "") === "") {
        yield call(getCatalogs)
    } else {
        try {
            const res = yield apiCall("/catalog/filter/" + action.payload, "GET", null)
            yield put(catalogActions.getCatalogsSuccess({res: res.data}))
        } catch (err) {
            yield put(catalogActions.yourActionFailureCatalogs(err.message));
        }
    }
}

// catalog products code
function* getCatalogProducts(action) {
    try {
        const res = yield apiCall("/catalog/" + action.payload, "GET", null)
        yield put(catalogActions.getCatalogProductsSuccess({res: res.data}))
    } catch (err) {
        yield put(catalogActions.yourActionFailureCatalogs(err.message));
    }
}

function* getCatalogProductsWithFilter(action) {
    const filterParam = {
        catalogProductName: action.payload.catalogProductQuickSearch,
        selectedProductCategory: action.payload.selectedProductCategory,
        currentCatalog: action.payload.currentCatalogId
    }
    try {
        const res = yield apiCall(`/catalog/product-filter`, "GET", null, JSON.stringify(filterParam))
        yield put(catalogActions.getCatalogProductsSuccess({res: res.data}))
    } catch (err) {
        yield put(catalogActions.yourActionFailureCatalogs(err.message));
    }
}

function* deleteCatalogProduct(action) {
    const p = action.payload;
    try {
        yield apiCall(`/catalog/${p.catalogId}/${p.productId}`, "DELETE", null);

        SuccessNotify("Catalog deleted Successfully!");

        yield put(catalogActions.getCatalogProducts());
    } catch (err) {
        yield put(catalogActions.yourActionFailureCatalogs(err.message));
    }
}


function* getProductCategories(action) {
    try {
        const res = yield apiCall("/product-category", "GET", null)
        yield put(catalogActions.getProductCategoriesSuccess({res: res.data}))
    } catch (err) {
        yield put(catalogActions.yourActionFailureCatalogs(err.message));
    }
}

function* getProductAbout(action) {
    try {
        const res = yield apiCall("/catalog/product-about/" + action.payload, "GET", null)
        yield put(catalogActions.getProductAboutSuccess({res: res.data}))
    } catch (err) {
        yield put(catalogActions.yourActionFailureCatalogs(err.message));
    }
}

function* getCatalogProductForProductAddPage(action) {
    const filterParam = {
        catalogProductName: action.payload.catalogProductQuickSearch,
        selectedProductCategory: action.payload.selectedProductCategory,
        currentCatalog: localStorage.getItem("currentCatalog")
    }
    try {
        const res = yield apiCall("/catalog/product-add/products", "GET", null, JSON.stringify(filterParam))
        yield put(catalogActions.getCatalogProductForProductAddPageSuccess({res: res.data}))
    } catch (err) {
        yield put(catalogActions.yourActionFailureCatalogs(err.message));
    }
}

function* addProductToCatalog(action) {
    const res = yield apiCall(`/catalog/product-add/${action.payload.catalogId}/${action.payload.productId}`, "POST", null)
    yield put(catalogActions.getCatalogProductForProductAddPage());
}

export function* catalogSaga() {
    yield takeEvery("catalog/getCatalogs", getCatalogs)
    yield takeEvery("catalog/saveCatalog", addCatalog)
    yield takeEvery("catalog/handleCatalogQuickSearch", getCatalogsWithFilter)
    yield takeEvery("catalog/deleteCatalogProduct", deleteCatalogProduct)
    yield takeEvery("catalog/getCatalogProducts", getCatalogProductsWithFilter)
    yield takeEvery("catalog/handleCatalogProductQuickSearch", getCatalogProductsWithFilter)
    yield takeEvery("catalog/handleCatalogProductQuickSearch", getCatalogProductForProductAddPage)
    yield takeEvery("catalog/handleSelectProductCategory", getCatalogProductsWithFilter)
    yield takeEvery("catalog/getProductCategories", getProductCategories)
    yield takeEvery("catalog/getProductAbout", getProductAbout)
    yield takeEvery("catalog/getCatalogProductForProductAddPage", getCatalogProductForProductAddPage)
    yield takeEvery("catalog/addProductToCatalog", addProductToCatalog)
}