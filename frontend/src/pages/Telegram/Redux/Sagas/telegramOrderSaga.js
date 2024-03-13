import {put, takeEvery, takeLatest} from "redux-saga/effects"
import apiCall from "../../../../Config/apiCall";
import { telegramOrderModel } from "../Reducers/telegramOrderReducer";


function* getProductsSaga() {
    const resOfProducts = yield apiCall("/product", "GET");
    yield put({
        type:telegramOrderModel.getProductsSuccess,
        payload:{
            products:resOfProducts.data
        }
    })
}

function* getProductSaga(action) {
    const resOfProducts = yield apiCall("/product/"+action.payload, "GET");
    yield put({
        type:telegramOrderModel.getProductSuccess,
        payload:resOfProducts.data
    })
}


export function* telegramOrderSaga() {
    yield takeEvery(telegramOrderModel.getProducts, getProductsSaga)
    yield takeEvery(telegramOrderModel.getProduct, getProductSaga)
}