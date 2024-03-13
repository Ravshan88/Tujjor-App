import {put, takeEvery, takeLatest} from "redux-saga/effects"
import apiCall from "../../../../Config/apiCall";
import {telegramClientModel} from "../Reducers/telegramClientReducer";
import {telegramProductModel} from "../Reducers/telegramProductReducer";


function* getProductsSaga() {
    const resOfProducts = yield apiCall("/product", "GET");
    const resOfCategories = yield apiCall("/product-category", "GET", null);
    yield put(telegramProductModel.getCategoriesSuccess({res: resOfCategories.data}))
    yield put(telegramProductModel.getProductsSuccess({res: resOfProducts.data}))
}
 
function* getCategoriesSaga() {
    const res = yield apiCall("/category", "GET");
    console.log("response: ",res);
    yield put({
        type:telegramProductModel.getCategoriesSuccess,
        payload: res.data
    })
}

function* saveProductSaga(action) {
    const formData = new FormData();
    formData.append("prefix", "/productImages")
    formData.append("photo", action.payload.file)
    formData.append("data", JSON.stringify(action.payload.data))
    const res = yield apiCall("/product", "POST", formData,"",
        {'Content-Type': 'multipart/form-data'}
    );
    yield put({
        type:telegramProductModel.getProducts
    })
}

function* editProductSaga(action) {
    const formData = new FormData();
    formData.append("file",action.payload.file)
    formData.append("title", action.payload.title)
    formData.append("categoryId", action.payload.categoryId)
    formData.append("price", action.payload.price)
    formData.append("count", action.payload.count)
    formData.append("free", action.payload.free)
    const res = yield apiCall("/product/"+action.payload.id, "PUT", formData,"",
        {'Content-Type': 'multipart/form-data'}
    );
    yield put({
        type:telegramProductModel.getProducts
    })
}

function* getInfoSaga(action) {
    const res = yield apiCall("/product/"+action.payload, "GET");
    yield put({
        type:telegramProductModel.getInfoSuccess,
        payload: res.data
    })
}

function* deleteProductSaga(action) {
    const res = yield apiCall("/product/"+action.payload, "DELETE");
    yield put({
        type:telegramProductModel.getProducts
    })
}

function* fillInitDataSaga(action) {
    const res = yield apiCall("/product/"+action.payload, "GET");
    yield put({
        type:telegramProductModel.fillInitDataSuccess,
        payload: res.data
    })
}


export function* telegramProductsSaga() {
    yield takeEvery(telegramProductModel.getProducts, getProductsSaga)
    yield takeLatest(telegramProductModel.saveProduct, saveProductSaga)
    yield takeLatest(telegramProductModel.getInfo, getInfoSaga)
    yield takeLatest(telegramProductModel.editProduct, editProductSaga)
    yield takeLatest(telegramProductModel.deleteProduct, deleteProductSaga)
    yield takeLatest(telegramProductModel.fillInitData, fillInitDataSaga)
}