import {put, takeEvery} from "redux-saga/effects";
import apiCall from "../../../../Config/apiCall";
import {dashboardDataModel} from "../Reducers/dashboardDataReducer";
import {GET_DASHBOARD_DATA, SET_SHOW_USER_MODAL} from "../constants/dashboardDataConstants";

function* watchGetDashboardData() {
    try {
        const {data} = yield apiCall("/dashboard-data", "GET", null)
        yield put(dashboardDataModel.getDashboardDataSuccess(data))
    } catch (e) {
        yield put(dashboardDataModel.getDashboardDataFailure(e.data()))
    }
}

function* watchSetShowUserModalData(action){
    try {
        yield put(dashboardDataModel.setShowUserSettingsModalSuccess(action.payload))
    } catch (e) {
        yield put(dashboardDataModel.setShowUserSettingsModalFailure(e))
    }
}


 function* dashboardDataSaga() {
    yield takeEvery(GET_DASHBOARD_DATA, watchGetDashboardData)
    yield takeEvery(SET_SHOW_USER_MODAL, watchSetShowUserModalData)
    yield takeEvery("dashboardData/getDashboardData",watchGetDashboardData);
}
export default dashboardDataSaga;