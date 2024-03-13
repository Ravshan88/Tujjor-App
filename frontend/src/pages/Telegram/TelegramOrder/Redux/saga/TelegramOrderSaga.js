import {put, takeEvery, call, select, delay} from "redux-saga/effects"
import {telegramOrder} from '../reducer/TelegramOrderReducer'
import apiCall from "../../../../../Config/apiCall";
import {message} from 'antd';

function* workGetOrders(action) {
    const currentState = yield select((state) => state.telegramOrderSlice);
    const token = localStorage.getItem("access_token")
    try {
        yield delay(500)
        const response = yield call(() => apiCall("/order?status=" + currentState.status + "&token=" + token, "GET", null));
        yield put(telegramOrder.getOrdersSuccess(response.data));
        yield delay(500)
        console.log(response.data)
    } catch (error) {
        yield put(telegramOrder.getOrdersFailure(error.message));
    }
}

function* workGetChangeOrderStatus(action) {

    try {
        const response = yield call(() => apiCall(`/order/${action.payload.id}?status=` + action.payload.status, "PATCH", null));
        message.success('Order`s status changed to ' + action.payload.status);
        yield call(workGetOrders)
    } catch (error) {
        yield put(telegramOrder.getOrdersFailure(error.message));
    }
}

function* changeOrderStatusToDelivering(action) {

    try {
        const response = yield call(() => apiCall(`/order/delivering/${action.payload}`, "PATCH", null));
        yield call(workGetOrders)
    } catch (error) {
        yield put(telegramOrder.getOrdersFailure(error.message));
    }
}

export function* TelegramOrderSaga() {
    yield takeEvery(telegramOrder.getOrdersStart().type, workGetOrders)
    yield takeEvery(telegramOrder.changeOrderStatus().type, workGetChangeOrderStatus)
    yield takeEvery(telegramOrder.changeOrderStatusToDelivering().type, changeOrderStatusToDelivering)
}