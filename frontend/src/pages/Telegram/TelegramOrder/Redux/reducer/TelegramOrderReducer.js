import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    isLoading: false,
    error: null,
    status: "NEW",
    orderInfo: null
}

const telegramOrderSlice = createSlice({
    name: "telegramOrder",
    initialState,
    reducers: {
        setOrderInfo(state, action) {
            state.orderInfo = action.payload
        },
        getOrdersStart(state, action) {
            state.isLoading = true
            state.error = null
        },
        getOrdersSuccess(state, action) {
            state.orders = action.payload
            state.isLoading = false;
            state.error = null
        },
        getOrdersFailure(state, action) {
            state.error = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        changeOrderStatus(state, action) {
            state.isLoading = true
        },
        changeOrderStatusToDelivering(state, action) {
        }
    }
})
export const telegramOrder = telegramOrderSlice.actions;
export default telegramOrderSlice.reducer