import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects"
import apiCall from "../../../../../../Config/apiCall";
import {productAction} from "../Reducers/ProductReducer"
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";
import {dealerAction} from "pages/Settings/ChildComponents/Dealers/Redux/Reducers/dealerReducer";

function* addProduct(action) {
    const {title, count, categoryId, price, dealerId, attachmentId} = action.payload.data
    const formData = new FormData()
    formData.append("prefix", "/productImages")
    formData.append("photo", action.payload.imgFileForBackend)
    formData.append("data", JSON.stringify(action.payload.data))
    console.log(action.payload)
    if (action.payload.isEditing) {
        if (title && count && (dealerId || action.payload.company) && categoryId && price && (attachmentId || action.payload.imgFileForBackend)) {
            yield action.payload.loadingButton(true);
            SuccessNotify("Product updated Successfully!")
            yield apiCall(`/product/${action.payload.editingId}`, "PUT", formData)
            yield put(productAction.handleClose())
            yield action.payload.loadingButton(false);
            yield call(getProducts)
        } else {
            ErrorNotify("Please fill all fields!")
        }
    } else {
        if (title && count && categoryId && price && (attachmentId || action.payload.imgFileForBackend)) {
            yield apiCall("/product", "POST", formData)
            SuccessNotify("Product successfully added")
            yield put(productAction.handleClose())
            yield action.payload.loadingButton(false);
            yield call(getProducts)
        } else {
            ErrorNotify("Please fill all fields!")
        }
    }
}

function* getProducts(action) {
    try {
        const res = yield apiCall("/product", "GET", null)
        yield put(productAction.getProductsSuccess({res: res.data}))
    } catch (err) {
        yield put(productAction.yourActionFailureIcons(err.message));
    }
}

function* getCategories(action) {
    try {
        const res = yield apiCall("/product-category", "GET", null)
        yield put(productAction.getCategorySuccess(res.data))
    } catch (err) {
        yield put(productAction.yourActionFailureIcons(err.message));
    }
}

function* getDealers(action) {
    try {
        const dealerRes = yield apiCall("/dealer", "GET", null)
        yield put(productAction.getDealersSuccess(dealerRes.data))
    } catch (err) {
        yield put(productAction.yourActionFailureIcons(err.message));
    }
}

export function* productSaga() {
    yield takeLatest(productAction.getProducts.type, getProducts)
    yield takeLatest(productAction.saveProduct.type, addProduct)
    yield takeLatest(productAction.getCategory.type, getCategories)
    yield takeLatest(productAction.getDealerStart.type, getDealers)
}