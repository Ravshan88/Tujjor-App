import {put, takeEvery} from "redux-saga/effects";
import apiCall from "../../../../Config/apiCall";

function* getAllData() {
  const res = yield apiCall("/settings", "GET",null,"");
  yield put({
    type: "settings/exchangeData",
    payload: {
      data: res.data,
    },
  });
}

function* settingsSaga() {
  yield takeEvery("settings/getData", getAllData);
}

export default settingsSaga;
